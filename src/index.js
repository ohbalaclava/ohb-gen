import 'tailwindcss/tailwind.css'
import 'text-security/text-security.css'
import './app.css'
import model from './modules/khybermodel'
import { MasterPasswordComponent } from './modules/MasterPasswordComponent'
import { KeywordComponent } from './modules/KeywordComponent'
import { LegacyComponent } from './modules/LegacyComponent'
import { GeneratedPasswordComponent } from './modules/GeneratedPasswordComponent'
import { LengthComponent } from './modules/LengthComponent'
import { IllegalCharactersComponent } from './modules/IllegalCharactersComponent'
import { IncludeCharactersComponent } from './modules/IncludeCharactersComponent'

const m = require('mithril')

function KhyberPassApp () {
  return {
    view: () => (
      <main>
        <div class='flex items-center h-screen w-full bg-gradient-to-b from-yellow-300 to-red-800'>
          <div class='w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto'>
            <h1 class='mb-5 text-xl text-yellow-900 font-thin'>KhyberPass</h1>
            <div class='space-y-4'>
              <KeywordComponent setter={model.setKeyword} saveFunction={model.save} />

              <IncludeCharactersComponent
                includeNumbers={model.getIncludeNumbers()}
                includeNumbersSetter={model.setIncludeNumbers}
                includeSymbols={model.getIncludeSymbols()}
                includeSymbolsSetter={model.setIncludeSymbols}
              />

              <IllegalCharactersComponent setter={model.setIllegalCharacters} />

              <LengthComponent setter={model.setPasswordLength} />

              <LegacyComponent setter={model.setLegacy} checked={model.getLegacy()} />

              <hr class='w-full' />

              <MasterPasswordComponent
                valid={model.isMasterPasswordValid()}
                validationHint={model.getValidationHint()}
                setter={model.setMasterPassword}
                value={model.getMasterPassword()}
              />

              <GeneratedPasswordComponent value={model.getGeneratedPassword()} reset={model.getPasswordExpiryTime()} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

m.mount(document.body, KhyberPassApp)
