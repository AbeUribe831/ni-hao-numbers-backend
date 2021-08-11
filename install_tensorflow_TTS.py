import os
os.system("rm -rf TensorFlowTTS")
os.system("git clone https://github.com/TensorSpeech/TensorFlowTTS.git")
os.chdir("TensorFlowTTS")
os.system("pip3 install .")
os.chdir("..")
import sys
sys.path.append("TensorFlowTTS/")

os.system("pip3 install git+https://github.com/repodiac/german_transliterate.git#egg=german_transliterate")
os.system("pip3 install h5py==2.10.0")