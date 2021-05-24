import 'tailwindcss/tailwind.css'
import 'text-security/text-security.css'
import './app.css'
import model from './modules/khybermodel'
import { MasterPasswordComponent } from './modules/MasterPasswordComponent'
import { KeywordComponent } from './modules/KeywordComponent'
import { GeneratedPasswordComponent } from './modules/GeneratedPasswordComponent'
import { LengthComponent } from './modules/LengthComponent'
import { IllegalCharactersComponent } from './modules/IllegalCharactersComponent'
import { IncludeCharactersComponent } from './modules/IncludeCharactersComponent'
import { TitleComponent } from './modules/TitleComponent'

const m = require('mithril')

function KhyberPassApp () {
  return {
    view: () => (
      <main>
        <div class='flex h-screen md:items-center w-full bg-gray-500'>
          <div class='w-full bg-gradient-to-b from-blue-900 to-black md:rounded shadow-lg p-4 md:p-8 md:max-w-md md:mx-auto'>
            <TitleComponent title='CHYBERPASS' />
            <div class='mt-5 space-y-4'>
              <KeywordComponent setter={model.setKeyword} saveFunction={model.save} />

              <IncludeCharactersComponent
                includeNumbers={model.getIncludeNumbers()}
                includeNumbersSetter={model.setIncludeNumbers}
                includeSymbols={model.getIncludeSymbols()}
                includeSymbolsSetter={model.setIncludeSymbols}
              />

              <IllegalCharactersComponent setter={model.setIllegalCharacters} />

              <LengthComponent setter={model.setPasswordLength} />

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
