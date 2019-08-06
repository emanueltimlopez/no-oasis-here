export const removeResources = (stack, resources) => {
  resources.forEach(resource => {
    const index = stack.filter(Boolean).findIndex(res => res.type === resource);
    stack[index] = null;
    debugger
  });  
  return [...stack.filter(Boolean)];
}

export const removeRandomResources = stack => stack.filter(() => (Math.random() < 0.5));

export const addResources = (stack, resources) => {
  resources.forEach(resource => {
    const newRes = stack.find(res => res.type === resource);
    stack.push(newRes);
  });
  return [...stack];
}

export const eliminateCardFromStack = (cards, index) => {
  cards[index] = null;
  return [...cards.filter(Boolean)];
}

export const addCardToStack = (cards, newCard) => ([...cards, newCard]);

export const countResource = (stack, resource) => stack.filter(res => res.type === resource.type).length;