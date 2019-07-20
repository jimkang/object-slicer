function reconstitute(levels) {
  // levels are all shallow; slice is fine.
  var reconstitutedLevels = levels.slice().map(reconstituteLevel);
  if (reconstitutedLevels.length > 0 && reconstitutedLevels[0].length > 0) {
    return reconstitutedLevels[0][0].value;
  }
}

function reconstituteLevel(level, i, levels) {
  for (var thingIndex = 0; thingIndex < level.length; ++thingIndex) {
    let thing = level[thingIndex];
    if (thing.parentIndex > -1) {
      let home = levels[i - 1][thing.parentIndex].value;
      if (thing.arrayIndex > -1) {
        home[thing.arrayIndex] = thing.value;
      } else if (thing.key) {
        home[thing.key] = thing.value;
      }
    }
  }
  return level;
}

module.exports = reconstitute;
