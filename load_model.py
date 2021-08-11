import tensorflow as tf
from tensorflow.python.ops.gen_math_ops import sign
from tensorflow_tts import inference

import yaml
import numpy as np
import matplotlib.pyplot as plt
import soundfile as sf
import os
import IPython.display as ipd

from tensorflow_tts.inference import AutoConfig
from tensorflow_tts.inference import TFAutoModel
from tensorflow_tts.inference import AutoProcessor

tacotron2 = TFAutoModel.from_pretrained("tensorspeech/tts-tacotron2-baker-ch", name="tacotron2")
fastspeech2 = TFAutoModel.from_pretrained("tensorspeech/tts-fastspeech2-baker-ch", name="fastspeech2")
mb_melgan = TFAutoModel.from_pretrained("tensorspeech/tts-mb_melgan-baker-ch", name="mb-melgan")
# Inference
processor = AutoProcessor.from_pretrained("tensorspeech/tts-tacotron2-baker-ch")
tf.saved_model.save(tacotron2, "%s/save_model/tacotron2_model"%os.getcwd(),  signatures=tacotron2.inference)
tf.saved_model.save(fastspeech2, "%s/save_model/fastspeech2_model"%os.getcwd(), signatures=fastspeech2.inference)
tf.saved_model.save(mb_melgan, "%s/save_model/mb_melgan_model"%os.getcwd(),  signatures=mb_melgan.inference)
processor._save_mapper( "%s/save_model/processor_model"%os.getcwd())