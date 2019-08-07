export const removeResources = (stack, resources) => {
  resources.forEach(resource => {
    const index = stack.findIndex(res => res && res.type === resource);
    stack[index] = null;
  });  
  return [...stack.filter(Boolean)];
}

export const removeRandomResources = stack => stack.filter(() => (Math.random() < 0.5));

export const addResources = (stack, allResources, resources) => {
  resources.forEach(resource => {
    const newRes = allResources.find(res => res.type === resource);
    stack.push(newRes);
  });
  return [...stack];
}

export const addCardToStack = (cards, newCard) => ([...cards, newCard]);

export const countResource = (stack, resource) => stack.filter(res => res.type === resource.type).length;