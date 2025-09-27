const dock = document.getElementById('dock')
const panel = document.getElementById('panel')
const calculator = document.getElementById('calculator')
const preview = document.getElementById('preview')
const baseFontRange = document.getElementById('baseFontRange')
const contrastRatio = document.getElementById('contrastRatio')
const nav = document.getElementById('nav')
const horizontal = document.getElementById('horizontal')
const vertical = document.getElementById('vertical')
const switchMode = document.getElementById('switchMode')
const switchText = document.getElementById('switchText')

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
switchText.textContent = prefersDark ? 'Dark' : 'Light'

switchMode.addEventListener('click', e => {
  const input = e.target.closest('input') 

  if (input) {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'Dark' : 'Light'

    if (systemTheme === 'dark' & !document.querySelector(':root').hasAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      if (document.documentElement.getAttribute('data-theme') === 'light') {
        switchText.textContent = 'Dark'
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        switchText.textContent = 'Light'
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }
  }
})

function createGridGuidelines(spacings) {
    preview.style.cssText = `
        position: relative;
        width: 100vw;
        height: 100vh;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        overflow: hidden;
    `;

    let currentX = 20;
    const verticalSection = document.createElement('div')
    verticalSection.setAttribute('id', 'verticals')
    spacings.forEach((spacing, index) => {
        const verticalLine = document.createElement('div');
        verticalLine.style.cssText = `
            position: absolute;
            left: ${currentX}px;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: #ccc;
            z-index: 1;
        `;
        verticalSection.appendChild(verticalLine);
        currentX += spacing;
    });
    preview.appendChild(verticalSection)

    const horizontalSection = document.createElement('div')
    horizontalSection.setAttribute('id', 'horizontals')
    let currentY = 20;
    spacings.forEach((spacing, index) => {
        const horizontalLine = document.createElement('div');
        horizontalLine.style.cssText = `
            position: absolute;
            left: 0;
            top: ${currentY}px;
            width: 100%;
            height: 1px;
            background-color: #ccc;
            z-index: 1;
        `;
        horizontalSection.appendChild(horizontalLine);
        currentY += spacing;
    });
    preview.appendChild(horizontalSection)
}

const spacings = Array.from({ length: 20 }, (_, i) => (i + 1) * 8);
createGridGuidelines(spacings);

function createScales(
    gridSystem = 8,
    typeScale = 'combine',
    baseFont = 16,
    ratio = 1.067,
    rootFont = 16
) {
  const scales = document.createElement('div')
  scales.setAttribute('id', 'scales')
  scales.setAttribute('class', 'relative z-1')

  // Typography
  // Font Size
  const typography = {
    xs: -1, sm: 0, md: 1, lg: 2, xl: 3, '2xl': 4, '3xl': 5, '4xl': 6, '5xl': 7, '6xl': 8
  };
  const dummyText = 'David Jayson Cosilet De Leon'
  // Line Height
  const types = {
    'combine': true,
    'modular': false,
    '4pt': true
  }

  for (const [label, step] of Object.entries(typography)) {
    const px = baseFont * Math.pow(ratio, step)
    const rem = px / rootFont // TODO: Need to convert into rem. function

    const div = document.createElement('div')
    div.textContent = dummyText
    console.log(rem)
    div.style.fontSize = `${rem.toFixed(3)}rem`
    div.classList.add('whitespace-nowrap')
    scales.appendChild(div)

    // Calculate optimal line height
    let lhMultiplier;
    if (px <= 12) lhMultiplier = 1.6;
    else if (px <= 16) lhMultiplier = 1.5;
    else if (px <= 20) lhMultiplier = 1.4;
    else lhMultiplier = 1.2;

    const idealLineHeightPx = px * lhMultiplier;
    const snappedLineHeightPx = Math.round(idealLineHeightPx / 4) * 4;
    const finalLineHeightRatio = snappedLineHeightPx / px;

    // if (types[typeScale]) {
    //   root.style.setProperty(`--lh-${label}`, `${finalLineHeightRatio}`)
    // } else {
    //   root.style.removeProperty(`--lh-${label}`)
    // }
  }

  
  preview.appendChild(scales)
}

createScales()



horizontal.addEventListener('input', (e) => {
  const checkbox = e.target.closest('input[type=checkbox]')

  if (checkbox) {
    const horizontals = document.getElementById('horizontals')

    if (checkbox.checked) {
      horizontals.style.display = 'block'
    } else {
      horizontals.style.display = 'none'
    }
  }
})

vertical.addEventListener('input', (e) => {
  const checkbox = e.target.closest('input[type=checkbox]')

  if (checkbox) {
    const verticals = document.getElementById('verticals')

    if (checkbox.checked) {
      verticals.style.display = 'block'
    } else {
      verticals.style.display = 'none'
    }
  }
})

const mediaQuery = window.matchMedia('(min-width: 640px)');

function handleMediaQueryChange(e) {
  if (e.matches) {
    panel.removeAttribute('style')
    calculator.classList.remove('hidden')
    nav.classList.remove('hidden')
    calculator.classList.add('h-screen')
  } else {
    panel.style.height = `${getPanelHeight()}vh`
  }
}

handleMediaQueryChange(mediaQuery);
mediaQuery.addEventListener('change', handleMediaQueryChange);

contrastRatio.addEventListener('click', e => {
  const button = e.target.closest('button')

  if (button) {
    // change active state
    const buttons = contrastRatio.querySelectorAll('button')
    buttons.forEach(b => b.classList.remove('btn-active'))
    button.classList.add('btn-active')

    // getGrid
    const gridValue = '8pt'

    // getTypeScale
    let typeScale = 'combine'
    const radios = typeScales.querySelectorAll('input[type=radio]')
    radios.forEach(r => r.checked ? typeScale = r.value : null)

    // get baseFont
    const baseFont = baseFontRange.value

    // getRatio
    const ratio = button.value

    const scales = document.getElementById('scales')
    scales.remove()
    
    createScales(gridValue, typeScale, baseFont, ratio, 16)
  }
})

baseFontRange.addEventListener('input', () => {
  const min = baseFontRange.min
  const max = baseFontRange.max
  const val = baseFontRange.value

  const percent = ((val - min) / (max - min)) * 100;
  baseFontTooltip.dataset.tip = `${val}px`;
  baseFontTooltip.style.insetInlineStart = `${percent}%`

  // getGrid
  const gridValue = '8pt'

  // getTypeScale
  let typeScale = 'combine'
  const radios = typeScales.querySelectorAll('input[type=radio]')
  radios.forEach(r => r.checked ? typeScale = r.value : null)

  // get baseFont
  const baseFont = baseFontRange.value

  // getRatio
  let ratio = 1.067
  const buttons = contrastRatio.querySelectorAll('button')
  buttons.forEach(b => b.classList.contains('btn-active') ? ratio = b.value : null)

  const scales = document.getElementById('scales')
  scales.remove()

  createScales(gridValue, typeScale, baseFont, ratio, 16)
})

document.addEventListener('DOMContentLoaded', () => {
  const panelHeightPX = window.innerHeight - dock.offsetHeight;

  const viewportHeightInPX = window.innerHeight;

  const panelHeightVH = (panelHeightPX / viewportHeightInPX) * 100;

  panel.style.height = `${panelHeightVH}vh`
})

function getPanelHeight() {
  const panelHeightPX = window.innerHeight - dock.offsetHeight;

  const viewportHeightInPX = window.innerHeight;

  return (panelHeightPX / viewportHeightInPX) * 100;
}

dock.addEventListener('click', e => {
  const button = e.target.closest('button')

  if (button) {
    const buttons = dock.querySelectorAll('button')
    buttons.forEach(b => b.classList.remove('dock-active'))
    button.classList.add('dock-active')

    if (button.textContent.trim() === 'Preview') {
      calculator.classList.add('hidden')
      preview.classList.remove('hidden')

      nav.classList.add('hidden')
    } else {
      calculator.classList.remove('hidden')
      preview.classList.add('hidden')

      nav.classList.remove('hidden')
    }
  }
})
