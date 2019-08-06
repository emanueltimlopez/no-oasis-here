export const RIOT = {
  front: {},
  img: 'riot',
  options: [
    {
      text: 'Choose to lose',
      status: 'ELIMINATE',
      resourcesOut: [ 'MONEY', 'MONEY', 'PRISIONER', 'PRISIONER' ],
    }, {
      text: 'Choose to lose worse',
      status: 'ELIMINATE',
      resourcesOut: [ 'WATER', 'WATER', 'PRISIONER', 'PRISIONER', 'PRISIONER', 'PRISIONER' ],
    }, {
      text: 'Die.',
      status: 'LOSE'
    }
  ]
};

export const HEALTH = {
  front: {},
  img: 'health',
  options: [
    {
      text: 'You lose a FRIEND, almost a friend',
      resourcesOut: [ 'FRIEND', 'WATER' ],
      status: 'ELIMINATE'
    }, {
      text: 'Be a human being, take water and rest in peace',
      resourcesOut: [ 'PRISIONER', 'WATER' ],
      status: 'ELIMINATE'
    }, {
      text: 'Die.',
      status: 'LOSE',
    }
  ]
};

export const EXTREME = {
  front: {},
  img: 'lastchance',
  options: [
    {
      text: 'Drink that smelly liquid',
      resourcesOut: [ 'WATER', 'WATER' ],
      status: 'ELIMINATE',
      consequence: 'HEALT',
    }, {
      text: 'Die.',
      status: 'LOSE',
    }
  ]
};

export const OASIS = {
  front: {},
  img: 'oasis',
  options: [
    {
      text: 'Take garbage from the floor',
      status: 'ELIMINATE',
      resourcesIn: [ 'OBJECT', 'OBJECT' ],
    }, {
      text: 'Drink water from the well',
      status: 'ELIMINATE',
      resourcesIn: [ 'WATER', 'WATER' ],
      consequence: 'HEALTH',
    }, {
      status: 'CONTINUE'
    }
  ]
}

export const UNKNOWN = {
  front: {},
  img: 'nn',
  options: [
    {
      text: 'Become friends',
      status: 'ELIMINATE',
      resourcesIn: [ 'FRIEND' ],
      resourcesOut: [ 'WATER' ],
    }, {
      text: 'Do me a favor',
      status: 'ELIMINATE',
      resourcesOut: [ 'PRISIONER', 'MONEY' ],
    }, {
      text: 'Take prisoner',
      status: 'ELIMINATE',
      resourcesIn: [ 'PRISIONER' ],
    }
  ]
}

export const RAIN = {
  front: {},
  img: 'rain',
  options: [
    {
      text: 'Convert rain to water',
      status: 'ELIMINATE',
      resourcesIn: [ 'WATER', 'WATER' ],
      resourcesOut: [ 'OBJECT' ],
    }, {
      text: 'Drink rain',
      status: 'ELIMINATE',
      resourcesIn: [ 'WATER' ],
      consequence: 'HEALTH',
    }, {
      text: 'Wait for it to stop raining',
      status: 'ELIMINATE',
    }
  ]
}

export const ASSAULT = {
  front: {},
  img: 'assault',
  options: [
    {
      text: 'Take my money and leave me alone',
      status: 'ELIMINATE',
      resourcesOut: [ 'MONEY', 'MONEY' ],
    }, {
      text: 'Fight, losing friends',
      status: 'ELIMINATE',
      resourcesIn: [ 'PRISIONER' ],
      resourcesOut: [ 'FRIEND', 'FRIEND' ],
    }, {
      text: 'Take whatever you want',
      resourcesOut: [],
      status: 'ELIMINATE',
    }
  ]
}

export const MERCHANT = {
  front: {},
  img: 'merchant',
  options: [
    {
      text: 'Exchange',
      status: 'ELIMINATE',
      resourcesIn: [ 'WATER' ],
      resourcesOut: [ 'MONEY', 'OBJECT' ],
    }, {
      text: 'This is not my friend anymore',
      status: 'ELIMINATE',
      resourcesIn: [ 'MONEY', 'MONEY' ],
      resourcesOut: [ 'FRIEND' ],
    }, {
      text: 'Scam you',
      resourcesOut: [ 'WATER', 'WATER' ],
      status: 'ELIMINATE',
    }
  ]
}

export default [ MERCHANT, ASSAULT, RAIN, UNKNOWN, HEALTH ];