#!/usr/bin/python

import sys
from gpiozero import Energenie

if len(sys.argv) == 1:
  print "Usage: switch.py <1-4> <on|off>"
else:
  try:
    switch = Energenie(int(sys.argv[1]))
    if sys.argv[2] == 'on':
      switch.on()
    elif sys.argv[2] == 'off':
      switch.off()
    else:
      print "Unknown command: " + sys.argv[2]
  except RuntimeError as err:
    print("Runtime error: {0}".format(err))
