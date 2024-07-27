// lib/app/elements.js

const baseUrlSvg = 'https://pipewriter-newui.web.app/Assets';

function createElementObject(id, { category, theme = '', pro = false, description = '' }) {
  return {
    id,
    category,
    theme,
    src: `${baseUrlSvg}/${id}${theme === '' ? '-dark' : ''}.svg`,
    // make alt from element description
    alt: id.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()), // Capitalize the first letter
    pro,
    description,
  };
}

const elementsDb = {
  // 'styleguide': { category: 'styles', theme: 'light', pro: false, description: 'style drops to cop' },
  'container-center': { category: 'containers', theme: 'light', pro: false, description: 'Empty centered container in light theme' },
  'background-empty': { category: 'containers', theme: 'light', pro: false, description: 'Empty fullwidth background in light theme' },
  'background-light': { category: 'containers', theme: 'light', pro: false, description: 'Light gray fullwidth background' },
  'container-center-dark': { category: 'containers', theme: 'dark', pro: false, description: 'Empty centered container in dark theme' },
  'background-empty-dark': { category: 'containers', theme: 'dark', pro: false, description: 'Empty fullwidth background in dark theme' },
  'background-light-dark': { category: 'containers', theme: 'dark', pro: false, description: 'Light gray background in dark theme' },
  'hero': { category: 'content', theme: 'light', pro: false, description: 'Hero in light theme' },
  'zz-left': { category: 'content', theme: 'light', pro: true, description: 'Zigzag text left in light theme' },
  'zz-right': { category: 'content', theme: 'light', pro: true, description: 'Zigzag text right in light theme' },
  'zz-left-dark': { category: 'content', theme: 'dark', pro: true, description: 'Zigzag text left in dark theme' },
  'zz-right-dark': { category: 'content', theme: 'dark', pro: true, description: 'Zigzag text right in dark theme' },
  'hero-dark': { category: 'content', theme: 'dark', pro: false, description: 'Hero in dark theme' },
  'blurbs-3': { category: 'blurbs', theme: 'light', pro: false, description: '3 horizontal blurbs in light theme' },
  'blurbs-4': { category: 'blurbs', theme: 'light', pro: false, description: '4 horizontal blurbs in light theme' },
  'blurbs-vert-3': { category: 'blurbs', theme: 'light', pro: true, description: '3 vertical blurbs in light theme' },
  'blurbs-3-dark': { category: 'blurbs', theme: 'dark', pro: false, description: '3 horizontal blurbs in dark theme' },
  'blurbs-vert-3-dark': { category: 'blurbs', theme: 'dark', pro: true, description: '3 vertical blurbs in dark theme' },
  'list-1': { category: 'lists', theme: 'light', pro: false, description: 'List single in light theme' },
  'list-2': { category: 'lists', theme: 'light', pro: false, description: 'List 2 in light theme' },
  'list-3': { category: 'lists', theme: 'light', pro: false, description: 'List 2x2 in light theme' },
  'list-1-dark': { category: 'lists', theme: 'dark', pro: false, description: 'List single in dark theme' },
  'list-2-dark': { category: 'lists', theme: 'dark', pro: false, description: 'List 2 in dark theme' },
  'list-3-dark': { category: 'lists', theme: 'dark', pro: false, description: 'List 2x2 in dark theme' },
  'button-left': { category: 'buttons', theme: 'light', pro: true, description: 'Button left in light theme' },
  'button-center': { category: 'buttons', theme: 'light', pro: true, description: 'Button center in light theme' },
  'button-right': { category: 'buttons', theme: 'light', pro: true, description: 'Button right in light theme' },
  'button-2-left': { category: 'buttons', theme: 'light', pro: false, description: 'Button 2 left in light theme' },
  'button-2-center': { category: 'buttons', theme: 'light', pro: false, description: 'Button 2 center in light theme' },
  'button-2-right': { category: 'buttons', theme: 'light', pro: false, description: 'Button 2 right in light theme' },
  'button-left-dark': { category: 'buttons', theme: 'dark', pro: true, description: 'Button left in dark theme' },
  'button-center-dark': { category: 'buttons', theme: 'dark', pro: true, description: 'Button center in dark theme' },
  'button-right-dark': { category: 'buttons', theme: 'dark', pro: true, description: 'Button right in dark theme' },
  'button-2-left-dark': { category: 'buttons', theme: 'dark', pro: false, description: 'Button 2 left in dark theme' },
  'button-2-center-dark': { category: 'buttons', theme: 'dark', pro: false, description: 'Button 2 center in dark theme' },
  'button-2-right-dark': { category: 'buttons', theme: 'dark', pro: false, description: 'Button 2 right in dark theme' },
  // Cards
  'cards-2-left': { category: 'cards', theme: 'light', pro: false, description: 'Cards 2 left in light theme' },
  'cards-2-center': { category: 'cards', theme: 'light', pro: false, description: 'Cards 2 center in light theme' },
  'cards-3': { category: 'cards', theme: 'light', pro: true, description: 'Cards 3 in light theme' },
  'cards-2x2': { category: 'cards', theme: 'light', pro: true, description: 'Cards 2x2 in light theme' },
  'pricing-cards': { category: 'cards', theme: 'light', pro: true, description: 'Pricing cards in light theme' },
  'cards-6': { category: 'cards', theme: 'light', pro: true, description: 'Cards 6 in light theme' },
  'cards-2-left-dark': { category: 'cards', theme: 'dark', pro: false, description: 'Cards 2 left in dark theme' },
  'cards-2-center-dark': { category: 'cards', theme: 'dark', pro: false, description: 'Cards 2 center in dark theme' },
  'cards-3-dark': { category: 'cards', theme: 'dark', pro: true, description: 'Cards 3 in dark theme' },
  'cards-2x2-dark': { category: 'cards', theme: 'dark', pro: true, description: 'Cards 2x2 in dark theme' },
  'pricing-cards-dark': { category: 'cards', theme: 'dark', pro: true, description: 'Pricing cards in dark theme' },
  'cards-6-dark': { category: 'cards', theme: 'dark', pro: true, description: 'Cards 6 in dark theme' },
};

// -----------------------------------------
// -----------------------------------------
// -----------------------------------------

const elements = Object.entries(elementsDb).reduce((acc, [id, props]) => {
  acc[id] = createElementObject(id, props);
  return acc;
}, {});


function updateProStatus(elementId, isPro) {
  if (elements[elementId]) {
    elements[elementId].pro = isPro;
  } else {
    console.warn(`Element ${elementId} not found.`);
  }
}
function groupElementsByCategory() {
  return Object.values(elements).reduce((acc, element) => {
    const { category } = element;
    if (!acc[category]) acc[category] = [];
    acc[category].push(element);
    return acc;
  }, {});
}

function getElement(id) {
  return elements[id] || null;
}

export { elements, groupElementsByCategory, getElement, updateProStatus };
