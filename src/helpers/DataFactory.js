
export function getSceneContent(_obj, _type, _id) {
  const content = _obj[_type], id = _id;
    let entry = content.find(s => s.id === id);
    return entry;
}

// find number in data arrayt, like an id array of drop ids
export function factoryFindNumberInArray(_data, _id) {
  const content = _data;
  let entry = content.find(id => id === _id);
  return entry;
}

// find data based on the data and id property
export function factoryFindDataByIDProperty(_data, _id) {
  const content = _data;
  let entry = content.find(i => i.id === _id);
  return entry;
}

//
export function factoryGetAllEntriesByType(_data, _property, _type) {
  const content = _data;
  let entries = content.filter(s => s[_property] === _type);
  return entries;
}
export function addDropIDsToCharacter(_item_id, _character_id) {
  let entry = window.CONFIG.data.item_data.find(i => i.id === _character_id);
  entry.dropids.push(_item_id);
}

export function setItemDataStatus(_id, _status) {
  const id = _id, status = _status;
  let item = window.CONFIG.data.item_data.find(i => i.id === id);
  item.status = status;
}
export function setItemDataActive(_id, _active) {
  const id = _id, active = _active;
  let item = window.CONFIG.data.item_data.find(i => i.id === id);
  item.active = active;
}
export function setExitDataActive(_scene_id, _exit_id, _active) {
  let scene = window.CONFIG.scenes.find(i => i.id === _scene_id);
  let exit = scene.exits.find(i => i.id === _exit_id);
  exit.active = _active;
}


export function factoryGetAllInventoryItems(_data) {
  const content = _data;
  let entries = content.filter(i => i.type === 'item' || i.type === 'groupitem');
  return entries;
}
export function factoryGetCollectedTotal(_data) {
  const data = _data;

  let total = data.filter(i => i.type === 'item' || i.type === 'groupitem')
  let collected = total.filter(i => i.status > 0);
  

  return collected.length + "/" + total.length;
}
export function factoryGetCollectedMedals(_data) {
  const data = _data;
  let collected = data.filter(i => i.status > 0);
  return collected.length + "/" + data.length;
}
  

// GET NUMBER OF ENTRIES
export function getDataEntries(_type, property, id) {
  const content = window.CONFIG.data[_type];
  let entries = content.filter(s => s[property] === id);
  return entries;
}
// GET DATA OBJECT LENGTH
export function getDataLength(_type) {
  const content = window.CONFIG.data[_type];
  return content.length;
}
// GET CONTENT OBJECT LENGTH
export function getLength(_type) {
  const content = window.CONFIG[_type];
  return content.length;
}
// GET TRACKING ENTRY
export function getTracking(_id) {
  const content = window.CONFIG.tracking.trackpoints;
  return content.find(s => s.id === _id);
}
// GET CONTENT OBJECT LENGTH
export function getOpenLevels(_type) {
  const content = window.CONFIG.data.levels_data;
  let levels = content.filter(s => s.visible === true);
  return levels.length;
}
// GET CONTENT OBJECT LENGTH
export function saveGameData() {
  const saved_data = {};

  saved_data.scenes = window.CONFIG.scenes;
  saved_data.data = window.CONFIG.data;

  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(window.LHCOOKIE, JSON.stringify(saved_data));
  }
}