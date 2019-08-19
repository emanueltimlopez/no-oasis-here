export const RIOT = {
  front: {},
  img: 'riot',
  options: [
    {
      text: 'Choose to lose',
      resourcesOut: [ 'MONEY', 'MONEY', 'PRISIONER', 'PRISIONER' ],
    }, {
      text: 'Choose to lose worse',
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
    }, {
      text: 'Be a human being, take water and rest in peace',
      resourcesOut: [ 'PRISIONER', 'WATER' ],
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
      resourcesIn: [ 'WATER', 'WATER' ],
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
      resourcesIn: [ 'OBJECT' ],
      status: 'CONTINUE',
    }, {
      text: 'Drink water from the well',
      resourcesIn: [ 'WATER', 'WATER' ],
      consequence: 'HEALTH',
      status: 'CONTINUE',
    }, {
      text: 'Continue the travel',
      status: 'CONTINUE',
    }
  ]
}

export const UNKNOWN = {
  front: {},
  img: 'nn',
  options: [
    {
      text: 'Become friends',
      resourcesIn: [ 'FRIEND' ],
      resourcesOut: [ 'WATER' ],
    }, {
      text: 'Do me a favor',
      resourcesOut: [ 'PRISIONER', 'MONEY' ],
    }, {
      text: 'Take prisoner',
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
      resourcesIn: [ 'WATER' ],
      resourcesOut: [ 'OBJECT' ],
    }, {
      text: 'Drink rain',
      resourcesIn: [ 'WATER' ],
      consequence: 'HEALTH',
    }, {
      text: 'A lightning kills and burn',
      resourcesOut: [],
    }
  ]
}

export const ASSAULT = {
  front: {},
  img: 'assault',
  options: [
    {
      text: 'Take my money and leave me alone',
      resourcesOut: [ 'MONEY', 'MONEY' ],
    }, {
      text: 'Fight, losing friends',
      resourcesIn: [ 'PRISIONER' ],
      resourcesOut: [ 'FRIEND' ],
    }, {
      text: 'Take whatever you want',
      resourcesOut: [],
    }
  ]
}

export const MERCHANT = {
  front: {},
  img: 'merchant',
  options: [
    {
      text: 'Exchange',
      resourcesIn: [ 'WATER' ],
      resourcesOut: [ 'MONEY', 'OBJECT' ],
    }, {
      text: 'This is not my friend anymore',
      resourcesIn: [ 'MONEY', 'MONEY' ],
      resourcesOut: [ 'FRIEND' ],
    }, {
      text: 'Become friends',
      resourcesIn: [ 'FRIEND' ],
    }
  ]
}

export default [ MERCHANT, ASSAULT, RAIN, UNKNOWN, UNKNOWN, HEALTH ];