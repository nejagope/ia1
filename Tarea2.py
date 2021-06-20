#Nelson González
#Carnet: 200412956
import time
import random

def reflex_agent(location, state):
    if state=="DIRTY":
        return 'CLEAN'
    elif location=='A':
        return 'RIGHT'
    elif location=='B':
        return 'LEFT'   

def aleatory_state():
  states = ('DIRTY', 'CLEAN')
  state = states[random.randint(0, 1)]
  print(state)
  return state

def test(states):
    while True:
        location = states[0]
        state = (states[2], states[1])[states[0]=='A']
        action = reflex_agent(location, state)
        print ("Location: "+location+" | Action: "+action)
        if action == "CLEAN":
            if location == 'A':
                states[1]="CLEAN"
            elif location == 'B':
                states[2]="CLEAN"
        elif action == "RIGHT":
            states[0]='B'
        elif action == "LEFT":
            states[0]='A' 
        time.sleep(3)
        if states[0] == 'A':
            states[2] = aleatory_state()
        else:
          states[1] = aleatory_state()

test(['A', 'DIRTY', 'DIRTY'])