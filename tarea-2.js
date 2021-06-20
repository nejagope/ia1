const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function reflex_agent(location, state){
    if (state === "DIRTY")
        return 'CLEAN'
    else if (location === 'A')
        return 'RIGHT'
    else if (location === 'B')
        return 'LEFT'
}
       

function aleatory_state(){
    let states = ['DIRTY', 'CLEAN']
    let aleatorio = Math.random() < 0.5 ? 0: 1
    let state = states[aleatorio]
    return state
}
  

async function test(states, callback){
    while (true){
        let location = states[0]
        let state = states[0] === 'A' ? states[1]: states[2];
        
        let action = reflex_agent(location, state)
        callback ("Location: "+location+" | Action: "+action)
        if (action === "CLEAN"){
            if (location === 'A')
                states[1] = "CLEAN"
            else if (location === 'B')
                states[2] = "CLEAN"
        }else if (action === "RIGHT"){
            states[0] = 'B'
        }else if (action === "LEFT"){
            states[0] = 'A' 
        }
        
        await sleep(3000);

        if (states[0] === 'A')
            states[2] = aleatory_state()
        else
          states[1] = aleatory_state()
    }
}

