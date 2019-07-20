// sliceIntoLevels expects these params:
// value: The value that should be put into a level.
// levels: The array of currently available levels.
// levelIndex: The index into levels into which a
// representation of value should be put.
// parentIndex: The index at which the representation of
// the parent can be found in the level at levelIndex - 1.
// arrayIndex: The arrayIndex at which value was found in
// its parent array.
// key: The key at which value was found in its parent
// array.

function sliceIntoLevels(
  value,
  levels = [],
  levelIndex = 0,
  parentIndex = -1,
  arrayIndex = -1,
  key
) {
  var level = [];
  if (levelIndex < levels.length) {
    level = levels[levelIndex];
  } else {
    levels[levelIndex] = level;
  }

  let representation = { value, parentIndex };
  if (arrayIndex > -1) {
    representation.arrayIndex = arrayIndex;
  } else if (key) {
    representation.key = key;
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      representation.value = [];
      for (let i = 0; i < value.length; ++i) {
        sliceIntoLevels(value[i], levels, levelIndex + 1, level.length, i);
      }
    } else {
      representation.value = {};
      for (let k in value) {
        sliceIntoLevels(value[k], levels, levelIndex + 1, level.length, -1, k);
      }
    }
  }

  level.push(representation);
  return levels;
}

module.exports = sliceIntoLevels;
