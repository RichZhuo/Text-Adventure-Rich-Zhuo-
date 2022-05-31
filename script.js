const textElement = document.getElementById('text')

const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
//textNodes is an array of objects
//The find() method returns the value of the first element that passes a test.
//The find() method executes a function for each array element.

  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  console.log(optionButtonsElement.firstChild)
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Will you take the Bed pill or the Blue',
    options: [
      {
        text: 'Red',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Blue',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'After taking the pill you feel weird,what will you?',
    options: [
      {
        text: 'Rest on the ground',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Ignore the feeling ',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Take the other pill',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After feeling better what should you do?',
    options: [
      {
        text: 'Take a jog',
        nextText: 4
      },
      {
        text: 'Take another break',
        nextText: 5
      },
      {
        text: 'Go find something to eat',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You start to jog until the effects of the pill starts to kick in and you fall over and sadly pass away..',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any food you slowly starve to death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You find something to eat and feel full of energy.',
    options: [
      {
        text: 'Keep on going.',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring you find a bear.',
    options: [
      {
        text: 'RUN!!!',
        nextText: 8
      },
      {
        text: 'Hide',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Punch the bear',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run but the bear easily catchs up to you and slashes you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought the bear wouldnt notice you and eats you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The bear sees you hide and tears of your arm and you bleed to death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You punched the bear with all your might and the bear exploxed into a red mist.',
    options: [
      {
        text: 'Congratulations! You survived.',
        nextText: -1
      }
    ]
  }
]

startGame() 