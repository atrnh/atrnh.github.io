const THRU = {};
const NOOP = {};
const cssClasses = new Map([[THRU, 'kc-thru'], [NOOP, 'kc-noop']]);

const qwerty = {
  name: 'qwerty',
  prevLayer: null,
  keymap: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Bksp'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Del'],
    ['Esc', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', {tapDD: [';', ':']}, '"'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', {tapDD: ['/', '\\']}, 'Enter'],
    [NOOP, 'Ctrl', 'Alt', 'Cmd', 'Lower', '', '', 'Raise', 'Left', 'Down', 'Up', 'Right']
  ]
};

const lower = {
  name: 'lower',
  prevLayer: qwerty,
  keymap: [
    new Array(12).fill(THRU),
    [THRU, '!', '@', '#', '$', NOOP, NOOP, '{' ,'}', '<', '>', THRU],
    [THRU, '%', '^', '&', '*', '-', '_', '(', ')', NOOP, NOOP, '`'],
    [THRU, NOOP, NOOP, '=', '+', '*', '|', '[', ']', NOOP, NOOP, THRU],
    new Array(12).fill(THRU)
  ]
};

const raise = {
  name: 'raise',
  prevLayer: lower,
  keymap: [
    [THRU, NOOP, '7', '8', '9', NOOP, NOOP, NOOP, NOOP, NOOP, NOOP, THRU],
    [THRU, NOOP, '4', '5', '6', NOOP, NOOP, NOOP, NOOP, NOOP, NOOP, THRU],
    [THRU, NOOP, '1', '2', '3', THRU, NOOP, NOOP, NOOP, NOOP, NOOP, THRU],
    [THRU, NOOP, '0', THRU, THRU, THRU, NOOP, NOOP, NOOP, NOOP, NOOP, THRU],
    new Array(12).fill(THRU)
  ]
};

const fns = new Array(12).fill('').map((s, i) => `F${i + 1}`);

const adjust = {
  prevLayer: raise,
  keymap: [
    fns,
    [THRU, 'Reset', 'Debug', THRU, THRU, THRU, THRU, 'Tm On', 'Tm Off', THRU, THRU, 'Del'],
    [THRU, THRU, 'MusMod', 'AudOn', 'AudOff', 'AGnorm', 'AGswap', NOOP, NOOP, NOOP, THRU, THRU],
    [THRU, 'Voice-', 'Voice+', 'MusOn', 'MusOff', 'MidiOn', 'MidiOff', THRU, THRU, THRU, THRU, THRU],
    new Array(12).fill(THRU)
  ]
};

const layers = [
  qwerty,
  lower,
  raise,
  adjust
];

function findLowestKey(x, y, prevLayer) {
  const pKeymap = prevLayer.keymap;
  if (pKeymap[x][y] !== THRU || !prevLayer.prevLayer) {
    return pKeymap[x][y] || '';
  }

  return findLowestKey(x, y, prevLayer.prevLayer);
}

function layerKeys(row, i, layer) {
  return row.map((key, j) => {
    const td = document.createElement('td');

    if (cssClasses.get(key)) {
      td.classList.add(cssClasses.get(key));
    }

    if (key === THRU) {
      key = findLowestKey(i, j, layer.prevLayer);
    }

    let keyStr = '';
    if (key.tapDD) {
      keyStr = key.tapDD[0];
    } else if (key !== THRU && key !== NOOP) {
      keyStr = key;
    }

    if (keyStr.length > 1) {
      td.classList.add('long-code');
    }

    td.appendChild(document.createTextNode(keyStr));
    return td;
  });
}

function createKeymapHtml(layer) {
  const tbl = document.createElement('table');
  tbl.id = layer.name;

  layer.keymap.map((r, i) => {
    const tr = document.createElement('tr');
    layerKeys(r, i, layer).forEach(td => tr.appendChild(td));
    return tr;
  }).forEach(tr => tbl.appendChild(tr));

  return tbl;
}


layers.map(layer => createKeymapHtml(layer))
  .forEach(tbl => document.querySelector('#keymaps').appendChild(tbl));

