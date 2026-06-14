import model from './khybermodel'
import { LengthComponent } from './LengthComponent'
import { IllegalCharactersComponent } from './IllegalCharactersComponent'
import { IncludeCharactersComponent } from './IncludeCharactersComponent'

import m from 'mithril'

let _showConfig = false;

function ExpandButton (initialVnode) {
  return {
    view: (vnode) =>
      m('div', { class: 'flex flex-row items-center justify-center' }, [
        m('hr', { class: 'border-yellow-700 w-full' }),
        m('button', {
          class: 'p-1 m-2 z-0 transition-colors duration-500 inline-flex items-center border border-pink-600 bg-yellow-400 hover:bg-yellow-200 focus:outline-none cursor-pointer',
          onclick: e => _showConfig = !_showConfig
        })
      ])
  }
}

function ConfigComponent (initialVnode) {
  return {
    view: (vnode) => {
      if (_showConfig) {
        return m('div', { class: 'space-y-4' }, [
          m(ExpandButton),

          m(IncludeCharactersComponent, {
            includeNumbers: model.getIncludeNumbers(),
            includeNumbersSetter: model.setIncludeNumbers,
            includeSymbols: model.getIncludeSymbols(),
            includeSymbolsSetter: model.setIncludeSymbols
          }),

          m(IllegalCharactersComponent, { setter: model.setIllegalCharacters }),

          m(LengthComponent, { setter: model.setPasswordLength, initialLength: model.isInfinite() ? 16 : 24 }),

          m('hr', { class: 'w-full' })
        ])
      } else {
        return m(ExpandButton)
      }
    }
  }
}

export { ConfigComponent }