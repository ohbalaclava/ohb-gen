import 'tailwindcss/tailwind.css'
import 'text-security/text-security.css'
import './app.css'
import model from './modules/khybermodel'
import { MasterPasswordComponent } from './modules/MasterPasswordComponent'
import { KeywordComponent } from './modules/KeywordComponent'
import { LegacyComponent } from './modules/LegacyComponent'
import { GeneratedPasswordComponent } from './modules/GeneratedPasswordComponent'
import { NotesComponent } from './modules/NotesComponent'
import { LengthComponent } from './modules/LengthComponent'
import { IllegalCharactersComponent } from './modules/IllegalCharactersComponent'

const m = require('mithril')

function KhyberPassApp () {
  return {
    view: () => (
      <main>
        <div class='flex items-center h-screen w-full bg-gradient-to-b from-yellow-300 to-red-800'>
          <div class='w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto'>
            <h1 class='mb-5 text-xl text-yellow-900 font-thin'>KhyberPass</h1>
            <div class='space-y-4'>
              <KeywordComponent setter={model.setKeyword} saveFunction={model.save()} />

              <fieldset>
                <legend class='text-base font-medium text-gray-900'>Include</legend>
                <div class='ml-4 mt-2 space-y-4'>
                  <div class='flex items-start'>
                    <div class='flex items-center h-5'>
                      <input
                        id='numbers'
                        name='numbers'
                        type='checkbox'
                        class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                        checked={model.getIncludeNumbers()}
                        oninput={e => model.setIncludeNumbers(e.target.checked)}
                      />
                    </div>
                    <div class='ml-3 text-sm'>
                      <label for='numbers' class='font-medium text-gray-700'>numbers</label>
                      <p class='text-gray-500'>The generated password will contain at least one number.</p>
                    </div>
                  </div>
                  <div class='flex items-start'>
                    <div class='flex items-center h-5'>
                      <input
                        id='symbols'
                        name='symbols'
                        type='checkbox'
                        class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                        checked={model.getIncludeSymbols()}
                        oninput={e => model.setIncludeSymbols(e.target.checked)}
                      />
                    </div>
                    <div class='ml-3 text-sm'>
                      <label for='symbols' class='font-medium text-gray-700'>symbols</label>
                      <p class='text-gray-500'>The generated password will contain at least one symbol.</p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <IllegalCharactersComponent setter={model.setIllegalCharacters} />
              
              <LengthComponent setter={model.setPasswordLength} />

              <NotesComponent setter={model.setNotes} />

              <LegacyComponent setter={model.setLegacy} checked={model.getLegacy()} />

              <hr class='w-full' />

              <MasterPasswordComponent
                empty={model.getMasterPassword().length === 0}
                valid={model.isMasterPasswordValid()}
                validationHint={model.getValidationHint()}
                setter={model.setMasterPassword}
              />

              <GeneratedPasswordComponent getter={model.getGeneratedPassword()} copyFunction={() => model.copyToClipboard()} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

m.mount(document.body, KhyberPassApp)
