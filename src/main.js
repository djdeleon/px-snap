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
const grid = document.getElementById('grid')
const typeScales = document.getElementById('typeScales')
const cssGenerators = document.getElementById('cssGenerators')

let getGrid = 8
let getGridLabel = '8pt Grid System + 4pt Baseline'
let getTypeScale = 'combine'
let getBaseFont = 16
let getRatio = 1.067
let getRootFont = 16

function getRatioLabel() {
  return contrastRatio.querySelector('.btn-active').textContent.trim()
}

cssGenerators.addEventListener('click', (e) => {
  const button = e.target.closest('button')

  if (!button) return;

  const type = button.textContent.trim()

  copyToken(generateExportFormats(type), button)
})

function scssToken() {
  // SCSS TOKENS
  let scssOutput = `/* PX Snap Design Tokens - Generated ${new Date().toLocaleString()} */\n`;
  scssOutput += `/* Base: ${getBaseFont}px | Ratio: ${getRatioLabel()} | Grid: ${getGridLabel} */\n\n`;

  // SCSS Variables Section
  scssOutput += `// Design Tokens Variables\n`;

  // Breakpoints
  const breakpoints = [
    {
      label: 'sm',
      size: '320px'
    },
    {
      label: 'md',
      size: '672px'
    },
    {
      label: 'lg',
      size: '1056px'
    },
    {
      label: 'xl',
      size: '1312px'
    },
    {
      label: '2xl',
      size: '1584px'
    },
  ];

  scssOutput += `\n// Breakpoints\n`;
  breakpoints.forEach(breakpoint => {
    scssOutput += `$bp-${breakpoint.label}: ${breakpoint.size};\n`;
  });

  // Spacing
  scssOutput += `\n// Spacing\n`;
  const spacings = Array.from({ length: 10 }, (_, i) => (i + 1) * getGrid);
  const spacingLabels = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];
  spacings.forEach((v, i) => {
    scssOutput += `$space-${spacingLabels[i]}: ${v}px;\n`;
  });

  // Typography SCSS
  const typography = calculateTypography();
  scssOutput += `\n// Typography\n`;
  scssOutput += `// Font Sizes\n`;
  typography.forEach(v => {
    scssOutput += `$fs-${v.label}: ${v.size};\n`;
  });
  scssOutput += `\n// Line Heights\n`;
  typography.forEach(v => {
    scssOutput += `$lh-${v.label}: ${v.lineHeight};\n`;
  });

  // SCSS Maps for easier iteration
  scssOutput += `\n// SCSS Maps\n`;
  scssOutput += `$breakpoints: (\n`;
  breakpoints.forEach((breakpoint, index) => {
    const comma = index < breakpoints.length - 1 ? ',' : '';
    scssOutput += `  ${breakpoint.label}: ${breakpoint.size}${comma}\n`;
  });
  scssOutput += `);\n\n`;

  scssOutput += `$spacings: (\n`;
  spacings.forEach((v, i) => {
    const comma = i < spacings.length - 1 ? ',' : '';
    scssOutput += `  ${spacingLabels[i]}: ${v}px${comma}\n`;
  });
  scssOutput += `);\n\n`;

  scssOutput += `$font-sizes: (\n`;
  typography.forEach((v, index) => {
    const comma = index < typography.length - 1 ? ',' : '';
    scssOutput += `  ${v.label}: ${v.size}${comma}\n`;
  });
  scssOutput += `);\n\n`;

  scssOutput += `$line-heights: (\n`;
  typography.forEach((v, index) => {
    const comma = index < typography.length - 1 ? ',' : '';
    scssOutput += `  ${v.label}: ${v.lineHeight}${comma}\n`;
  });
  scssOutput += `);\n\n`;

  // CSS Custom Properties (for CSS compatibility)
  scssOutput += `:root {\n`;
  scssOutput += `  // Breakpoints\n`;
  breakpoints.forEach(breakpoint => {
    scssOutput += `  --bp-${breakpoint.label}: #{$bp-${breakpoint.label}};\n`;
  });

  scssOutput += `\n  // Spacing\n`;
  spacings.forEach((v, i) => {
    scssOutput += `  --space-${spacingLabels[i]}: #{$space-${spacingLabels[i]}};\n`;
  });

  scssOutput += `\n  // Typography\n`;
  typography.forEach(v => {
    scssOutput += `  --fs-${v.label}: #{$fs-${v.label}};\n`;
  });
  scssOutput += `\n`;
  typography.forEach(v => {
    scssOutput += `  --lh-${v.label}: #{$lh-${v.label}};\n`;
  });
  scssOutput += `}\n\n`;

  // Mixins
  scssOutput += `// Mixins\n`;
  scssOutput += `@mixin breakpoint($size) {\n`;
  scssOutput += `  @if map-has-key($breakpoints, $size) {\n`;
  scssOutput += `    @media (min-width: map-get($breakpoints, $size)) {\n`;
  scssOutput += `      @content;\n`;
  scssOutput += `    }\n`;
  scssOutput += `  } @else {\n`;
  scssOutput += `    @warn "Breakpoint #{$size} not found in $breakpoints map";\n`;
  scssOutput += `  }\n`;
  scssOutput += `}\n\n`;

  scssOutput += `@mixin text-style($size) {\n`;
  scssOutput += `  @if map-has-key($font-sizes, $size) and map-has-key($line-heights, $size) {\n`;
  scssOutput += `    font-size: map-get($font-sizes, $size);\n`;
  scssOutput += `    line-height: map-get($line-heights, $size);\n`;
  scssOutput += `  } @else {\n`;
  scssOutput += `    @warn "Text style #{$size} not found";\n`;
  scssOutput += `  }\n`;
  scssOutput += `}\n\n`;

  // Utility Classes
  scssOutput += `// Typography Utilities\n`;
  typography.forEach(v => {
    scssOutput += `.text-${v.label} {\n`;
    scssOutput += `  @include text-style(${v.label});\n`;
    scssOutput += `}\n\n`;
  });

  scssOutput += `// Spacing Utilities\n`;
  scssOutput += `// Margin\n`;
  spacings.forEach((v, i) => {
    scssOutput += `.m-${i+1} {\n`;
    scssOutput += `  margin: $space-${spacingLabels[i]};\n`;
    scssOutput += `}\n\n`;
  });

  scssOutput += `// Padding\n`;
  spacings.forEach((v, i) => {
    scssOutput += `.p-${i+1} {\n`;
    scssOutput += `  padding: $space-${spacingLabels[i]};\n`;
    scssOutput += `}\n\n`;
  });

  scssOutput += `// Gap\n`;
  spacings.forEach((v, i) => {
    scssOutput += `.gap-${i+1} {\n`;
    scssOutput += `  gap: $space-${spacingLabels[i]};\n`;
    scssOutput += `}\n\n`;
  });

  return scssOutput;
}

function cssToken() {
  // CSS TOKENS
  let cssOutput = `/* PX Snap Design Tokens - Generated ${new Date().toLocaleString()} */\n`;
  cssOutput += `/* Base: ${getBaseFont}px | Ratio: ${getRatioLabel()} | Grid: ${getGridLabel} */\n\n`;
  cssOutput += `:root {\n`;

  // Breakpoints
  const breakpoints = [
    {
      label: 'sm',
      size: '320px'
    },
    {
      label: 'md',
      size: '672px'
    },
    {
      label: 'lg',
      size: '1056px'
    },
    {
      label: 'xl',
      size: '1312px'
    },
    {
      label: '2xl',
      size: '1584px'
    },
  ]

  cssOutput += `  /* Breakpoints */\n`;
  let breakpointSizeTokens = `  /* Viewports */\n`
  let breakpointQueryTokens = `\n  /* Media Queries */\n`
  breakpoints.forEach(breakpoint => {
    breakpointSizeTokens += `  --bp-${breakpoint.label}: ${breakpoint.size}\n`
    breakpointQueryTokens += `  @media (min-width: ${breakpoint.size}) {}\n`
  })

  cssOutput += breakpointSizeTokens
  cssOutput += breakpointQueryTokens
  
  // Spacing
  cssOutput += `\n  /* Spacing */\n`;
  const spacings = Array.from({ length: 10 }, (_, i) => (i + 1) * getGrid)
  const spacingLabels = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];

  let spacingTokens = ''
  spacings.forEach((v, i) => spacingTokens += `  --space-${spacingLabels[i]}: ${v}px\n`)
  cssOutput += spacingTokens
  
  // Typography CSS
  const typography = calculateTypography()
  let typeFontSize = `  /* Font SIze */\n`
  let typeLineHeight = `\n  /* Line Height */\n`

  cssOutput += `\n  /* Typography */\n`;
  typography.forEach(v => {
    typeFontSize += `  --fs-${v.label}: ${v.size};\n`;
    typeLineHeight += `  --lh-${v.label}: ${v.lineHeight};\n`;
  });
  cssOutput += typeFontSize
  cssOutput += typeLineHeight
  
  // Utility Classes
  cssOutput += `\n  /* Typography Utilities */\n`;
  typography.forEach(v => {
    cssOutput += `  .text-${v.label} { font-size: var(--fs-${v.label}); line-height: var(--lh-${v.label}); }\n`;
  });

  cssOutput += `\n  /* Spacing Utilities */\n`;
  let spacingMargins = `  /* Margin */\n`
  let spacingPaddings = `\n  /* Padding */\n`
  let spacingGaps = `\n  /* Gap */\n`
  spacings.forEach((v, i) => {
    spacingMargins += `  .m-${i+1} { margin: var(--space-${spacingLabels[i]}); }\n`;
    spacingPaddings += `  .p-${i+1} { padding: var(--space-${spacingLabels[i]}); }\n`;
    spacingGaps += `  .gap-${i+1} { gap: var(--space-${spacingLabels[i]}); }\n`;
  });

  cssOutput += spacingMargins
  cssOutput += spacingPaddings
  cssOutput += spacingGaps

  cssOutput += `}\n\n`;

  return cssOutput
}

function generateExportFormats(type) {
  switch (type) {
    case 'CSS':
      return cssToken()
    case 'SCSS':
      return scssToken()
  }
}

async function copyToken(tokens, element) {
  try {
    await navigator.clipboard.writeText(tokens)

    const svg = element.firstElementChild
    svg.classList.add('hidden')
    const checkIcon = element.querySelector('.checkIcon')
    checkIcon.classList.remove('hidden')

    setTimeout(() => {
      svg.classList.remove('hidden')
      checkIcon.classList.add('hidden')
    }, 1000)
  } catch (err) {
    alert('Copying failed, try again later.')
  }
}

function calculateTypography() {
  const fontSizes  = []

  const typography = {
    xs: -1, sm: 0, md: 1, lg: 2, xl: 3, '2xl': 4, '3xl': 5, '4xl': 6, '5xl': 7, '6xl': 8
  };

  // Line Height
  const types = {
    'combine': true,
    'modular': false,
    '4pt': true
  }

  for (const [label, step] of Object.entries(typography)) {
    const px = getBaseFont * Math.pow(getRatio, step)

    // Calculate optimal line height
    let lhMultiplier;
    if (px <= 12) lhMultiplier = 1.6;
    else if (px <= 16) lhMultiplier = 1.5;
    else if (px <= 20) lhMultiplier = 1.4;
    else lhMultiplier = 1.2;

    const idealLineHeightPx = px * lhMultiplier;
    const snappedLineHeightPx = Math.round(idealLineHeightPx / 4) * 4;
    const finalLineHeightRatio = snappedLineHeightPx / px;

    fontSizes.push({
        label: label,
        size: `${toRem(px).toFixed(3)}rem`,
        lineHeight: types[getTypeScale] ? finalLineHeightRatio.toFixed(3) : `${idealLineHeightPx.toFixed()}px`
    })
  }

  return fontSizes
}

function createScales() {
  console.log(getGrid, getTypeScale, getBaseFont, getRatio, getRootFont)
  const typography = calculateTypography()

  document.getElementById('scales')?.remove()

  const scales = document.createElement('div')
  scales.setAttribute('id', 'scales')
  scales.setAttribute('class', 'relative z-1 h-screen p-5')

  typography.forEach(v => {
    const div = document.createElement('div')
    div.textContent = 'The quick brown fox jumps over the lazy dog'
    div.style.fontSize = `${v.size}`
    div.classList.add('whitespace-nowrap')
    div.classList.add('mb-10')
    scales.appendChild(div)
  })
  
  preview.appendChild(scales)
}
createScales()

function toRem(px) {
  return px / getRootFont
}

grid.addEventListener('click', (e) => {
  const input = e.target.closest('input')
  if (!input) return;

  getGrid = input.value
  getGridLabel = input.dataset.grid

  createScales()
})

typeScales.addEventListener('click', e => {
  const input = e.target.closest('input')
  if (!input) return;

  getTypeScale = input.value

  createScales()
})

baseFontRange.addEventListener('input', () => {
  const min = baseFontRange.min
  const max = baseFontRange.max
  const val = baseFontRange.value

  const percent = ((val - min) / (max - min)) * 100;
  baseFontTooltip.dataset.tip = `${val}px`;
  baseFontTooltip.style.insetInlineStart = `${percent}%`

  getBaseFont = baseFontRange.value

  createScales()
})

contrastRatio.addEventListener('click', e => {
  const oldActiveButton = contrastRatio.querySelector('.btn-active')
  const newActiveButton = e.target.closest('button')
  if (!oldActiveButton || !newActiveButton) return;

  oldActiveButton.classList.remove('btn-active')
  newActiveButton.classList.add('btn-active')

  getRatio = newActiveButton.value
  
  createScales()
})

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

const preferColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
let prefersDark = preferColorScheme.matches

if (prefersDark) { // initial state
  switchText.textContent = 'Dark'
} else {
  switchText.textContent = 'Light'
  switchMode.querySelector('input[type=checkbox]').setAttribute('checked', 'checked')
}

preferColorScheme.addEventListener('change', (e) => { // system change
  if (e.matches) {
    switchText.textContent = 'Dark'
    switchMode.querySelector('input[type=checkbox]').removeAttribute('checked')
    prefersDark = true
  } else {
    switchText.textContent = 'Light'
    switchMode.querySelector('input[type=checkbox]').setAttribute('checked', 'checked')
    prefersDark = false
  }

  document.documentElement.removeAttribute('data-theme')
})

switchMode.addEventListener('click', e => {
  const input = e.target.closest('input[type=checkbox]')
  const root = document.documentElement
  let hasDatatheme = document.querySelector(':root').hasAttribute('data-theme')

  if (input) {
    if (prefersDark) {
      if (!hasDatatheme) {
        root.setAttribute('data-theme', 'light') // 1st toggle
        switchText.textContent = 'Light'
      } else {
        // 2nd or more toggle
        if (root.getAttribute('data-theme') === 'light') {
          root.setAttribute('data-theme', 'dark')
          switchText.textContent = 'Dark'
        } else {
          root.setAttribute('data-theme', 'light')
          switchText.textContent = 'Light'
        }
      }
    } else {
      if (!hasDatatheme) {
        root.setAttribute('data-theme', 'dark') // 1st toggle
        switchText.textContent = 'Dark'
      } else {
        // 2nd or more toggle
        if (root.getAttribute('data-theme') === 'light') {
          root.setAttribute('data-theme', 'dark')
        switchText.textContent = 'Dark'
        } else {
          root.setAttribute('data-theme', 'light')
          switchText.textContent = 'Light'
        }
      }
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
    preview.style.overflow = 'auto'
  } else {
    panel.style.height = `${getPanelHeight()}vh`
  }
}

handleMediaQueryChange(mediaQuery);
mediaQuery.addEventListener('change', handleMediaQueryChange);