const compose = (source, dest, requstedFields) => {
  for (const field of requstedFields) {
    if (field.selectionSet) {
      if (typeof source[field.name.value].values === 'function') {
        const values = [...source[field.name.value].values()];
        dest[field.name.value] = [];
        for (const val of values) {
          compose(
            val,
            dest[field.name.value],
            field.selectionSet.selections
          );
        }
      } else {
        dest[field.name.value] = {};
        compose(
          source[field.name.value],
          dest[field.name.value],
          field.selectionSet.selections
        );
      }
    } else if (Array.isArray(dest)) {
      dest.push(source);
    } else {
      dest[field.name.value] = source[field.name.value];
    }
  }
};

module.exports = compose;
