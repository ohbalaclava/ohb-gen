import model from './khybermodel'
import { LengthComponent } from './LengthComponent'
import { IllegalCharactersComponent } from './IllegalCharactersComponent'
import { IncludeCharactersComponent } from './IncludeCharactersComponent'

import m from 'mithril'

let _showConfig = false;

function ExpandButton (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='flex flex-row items-center justify-center'>
          <hr class='border-yellow-700 w-full' />
          <button
            class='p-1 m-2 z-0 transition-colors duration-500 inline-flex items-center border border-pink-600 bg-yellow-400 hover:bg-yellow-200 focus:outline-none cursor-pointer'
            onclick={e => _showConfig = !_showConfig}
          >
          </button>
        </div>
      )
    }
  }
}

function ConfigComponent (initialVnode) {
  return {
    view: (vnode) => {
      if (_showConfig) {
        return (
          <div class='space-y-4'>
            <ExpandButton />

            <IncludeCharactersComponent
              includeNumbers={model.getIncludeNumbers()}
              includeNumbersSetter={model.setIncludeNumbers}
              includeSymbols={model.getIncludeSymbols()}
              includeSymbolsSetter={model.setIncludeSymbols}
            />

            <IllegalCharactersComponent setter={model.setIllegalCharacters} />

            <LengthComponent setter={model.setPasswordLength} initialLength={model.isInfinite() ? 16 : 24} />

            <hr class='w-full' />
          </div>
        )
      } else {
        return (
          <ExpandButton />
        )
      }
    }
  }
}

export { ConfigComponent }
