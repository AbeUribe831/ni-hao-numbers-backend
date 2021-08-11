import json
from flask.helpers import make_response
from flask.json import jsonify
import tensorflow as tf
import soundfile as sf
import os
import base64
import numpy as numpy
import io
print('--------------------------Before tf load-------------------------\n')
from tensorflow_tts.inference import AutoProcessor
from datetime import datetime
from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
from pydub import AudioSegment

tacotron2 = tf.saved_model.load("%s/save_model/tacotron2_model"%os.getcwd())
print('------------------------After tacotron2-------------------\n')
fastspeech2 = tf.saved_model.load("%s/save_model/fastspeech2_model"%os.getcwd())

mb_melgan = tf.saved_model.load("%s/save_model/mb_melgan_model"%os.getcwd())
print('------------------------After mb_melgan-------------------\n')
# Inference
processor =  AutoProcessor.from_pretrained("%s/save_model/processor_model"%os.getcwd())
# ("%s/save_model/processor_model"%os.getcwd())
print('------------------------After processor-------------------\n')

def create_app():
    app = Flask(__name__)
    return app

app = create_app()
#cors = CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/fo', methods=['GET'])
def demo_post_fo():
    return jsonify({"message": "success"})

#receive list of chinese characters in body
@app.route('/chinese-numbers-to-audio', methods=['POST'])
def chinese_numbers_to_audio():
    list = request.json['chinese_numbers_list']
    try:
        audios = {"chinese_audio": []}
        audios["chinese_audio"] = synthesize_list_of_numbers(list, 'negAudio', "FASTSPEECH2")
        return make_response(jsonify(audios))
    except ValueError:
        return Response("{\"message\": \"bad chinese_numbers_list\"}", status=400)

def _do_synthesis(input_text, text2mel_model, vocoder_model, text2mel_name, vocoder_name):
    input_ids = processor.text_to_sequence(input_text, inference=True)
    # text2mel part
    if text2mel_name == "TACOTRON":
        _, mel_outputs, stop_token_prediction, alignment_history = text2mel_model.inference(
            tf.expand_dims(tf.convert_to_tensor(input_ids, dtype=tf.int32), 0),
            tf.convert_to_tensor([len(input_ids)], tf.int32),
            tf.convert_to_tensor([0], dtype=tf.int32)
        )
    elif text2mel_name == "FASTSPEECH2":
        mel_before, mel_outputs, duration_outputs, _, _ = text2mel_model.inference(
        tf.expand_dims(tf.convert_to_tensor(input_ids, dtype=tf.int32), 0),
        speaker_ids=tf.convert_to_tensor([0], dtype=tf.int32),
        speed_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
        f0_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
        energy_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
    )
    else:
        raise ValueError("only TACOTRON are supported on text2mel_name")
    # vocoder part
    if vocoder_name == "MB-MELGAN":
        #tacotron-2 generate noise in the end symtematic, let remove it :v.
        if text2mel_name == "TACOTRON":
            remove_end = 1024
        else:
            remove_end = 1
        audio = vocoder_model.inference(mel_outputs)[0, :-remove_end, 0]
    else:
        raise ValueError("only MB_MELGAN are supported on vocoder_name")
    # Tacotron2 + MB-MelGAN test
    # write .wav file to be able to convert it to mp3, endcode in base64, and send to user
    timestamp = datetime.timestamp(datetime.now())
    bytes_io_mp3 = io.BytesIO() 
    # filename uses timestamp to ensure unique filename
    filename = os.getcwd() + '/audio/' + str(timestamp) + '.wav'
    sf.write(filename, audio.numpy(), 22050, "PCM_16")
    to_convert = AudioSegment.from_wav(filename)
    to_convert.export(bytes_io_mp3, format('mp3'))
    os.remove(filename)
    return base64.b64encode(bytes_io_mp3.getvalue())


# create directory for list of audio data encoded in base64
def synthesize_list_of_numbers(list_of_numbers_as_text, dir, text2mel_name):
    list_of_audios = []
    for num in list_of_numbers_as_text:
         list_of_audios.append(_do_synthesis(num, fastspeech2, mb_melgan, text2mel_name, "MB-MELGAN"))
    return list_of_audios
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3500)
