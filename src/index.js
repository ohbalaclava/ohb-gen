import 'tailwindcss/tailwind.css'
import 'text-security/text-security.css'
import './app.css'
import model from './modules/khybermodel.js'

const m = require('mithril')

function KhyberPassApp () {
  return {
    view: () => (
      <main>
        <div class='flex items-center h-screen w-full bg-gradient-to-b from-yellow-300 to-red-800'>
          <div class='w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto'>
            <h1 class='mb-5 text-xl text-yellow-900 font-thin'>KhyberPass</h1>
            <div class='space-y-4'>
              <div class='mt-1 flex rounded-md shadow-sm'>
                <label for='master-password' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                  Master Password
                </label>
                <input
                  type='text'
                  name='master-password'
                  id='master-password'
                  class={`${model.getMasterPasswordValidationClasses()} semi-obscured focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300`}
                  oninput={e => model.setMasterPassword(e.target.value)}
                />
              </div>

              <div class='mt-1 flex rounded-md shadow-sm'>
                <label for='keyword' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                  App/Site/Account
                </label>
                <input
                  type='text'
                  autocomplete='off'
                  list='keywords'
                  name='keyword' id='keyword'
                  class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300'
                  oninput={e => model.setKeyword(e.target.value)}
                />
                <button
                  class='w-6 transition-colors duration-500 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-200 focus:outline-none cursor-pointer'
                  onclick={model.save()}
                >
                  <svg class='mx-1 text-gray-500' viewBox='0 0 64 64'>
                    <g>
                      <path d='m49 3h-42a4 4 0 0 0 -4 4v50a4 4 0 0 0 4 4h50a4 4 0 0 0 4-4v-46l-8-8z' fill='white' />
                      <path d='m49 3v17a2.006 2.006 0 0 1 -2 2h-30a2.006 2.006 0 0 1 -2-2v-17z' fill='white' />
                      <path d='m35 7h6v11h-6z' fill='white' />
                      <path d='m51 31h-38a4 4 0 0 0 -4 4v26h46v-26a4 4 0 0 0 -4-4z' fill='white' />
                      <path d='m3 56v1a4 4 0 0 0 4 4h2v-5z' fill='lightgray' />
                      <path d='m55 5v56h2a4 4 0 0 0 4-4v-46z' fill='lightgray' />
                      <path d='m47 56h-38v5h46v-13a8 8 0 0 1 -8 8z' fill='lightgray' />
                      <g fill='currentColor'>
                        <path d='m61.707 10.293-8-8a1 1 0 0 0 -.707-.293h-46a5.006 5.006 0 0 0 -5 5v50a5.006 5.006 0 0 0 5 5h50a5.006 5.006 0 0 0 5-5v-46a1 1 0 0 0 -.293-.707zm-13.707-6.293v16a1 1 0 0 1 -1 1h-30a1 1 0 0 1 -1-1v-16zm-38 56v-25a3 3 0 0 1 3-3h38a3 3 0 0 1 3 3v25zm50-3a3 3 0 0 1 -3 3h-1v-25a5.006 5.006 0 0 0 -5-5h-38a5.006 5.006 0 0 0 -5 5v25h-1a3 3 0 0 1 -3-3v-50a3 3 0 0 1 3-3h7v16a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-16h2.586l7.414 7.414z' />
                        <path d='m35 19h6a1 1 0 0 0 1-1v-11a1 1 0 0 0 -1-1h-6a1 1 0 0 0 -1 1v11a1 1 0 0 0 1 1zm1-11h4v9h-4z' />
                        <path d='m47 45h-30a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2z' />
                        <path d='m47 39h-30a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2z' />
                        <path d='m47 51h-30a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2z' />
                      </g>
                    </g>
                  </svg>
                </button>
                <datalist id='keywords' />
              </div>

              <div class='mt-2 flex items-start'>
                <div class='flex items-center h-5'>
                  <input
                    id='legacy'
                    name='legacy'
                    type='checkbox'
                    class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                    checked={model.getLegacy()}
                    oninput={e => model.setLegacy(e.target.checked)}
                  />
                </div>
                <div class='ml-3 text-sm'>
                  <label for='legacy' class='font-medium text-gray-700'>legacy</label>
                  <p class='text-gray-500'>Use the Infinite Password method to generate the password.</p>
                </div>
              </div>

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

              <div class='flex items-start has-tooltip'>
                <span class='tooltip rounded shadow-md py-1 px-2 w-80 text-gray-50 bg-gray-600 text-sm -mt-12'>If there are any characters the password must not contain then list them here</span>
                <div class='mt-1 flex rounded-md shadow-sm'>
                  <label for='contains-not' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    Illegal characters
                  </label>
                  <input
                    type='text'
                    name='contains-not'
                    id='contains-not'
                    placeholder='e.g. $%£!...'
                    class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    oninput={e => model.setIllegalCharacters(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label for='length' class='text-base font-medium text-gray-900'>
                  Length
                </label>
                <div class='flex flex-row mt-2 h-10 w-32 rounded-md relative'>
                  <button
                    class='z-0 font-semibold inline-flex items-center rounded-l-md border border-r-0 h-full w-20 border-gray-300 hover:bg-gray-100 text-gray-500 bg-gray-200 text-sm focus:outline-none cursor-pointer'
                    onclick={() => model.decrementPasswordLength()}
                  >
                    <span class='m-auto'>-</span>
                  </button>
                  <input
                    type='number'
                    id='length'
                    name='length'
                    min='8'
                    max='64'
                    value={model.getPasswordLength()}
                    oninput={e => model.setPasswordLength(e.target.value)}
                    step='1'
                    class='z-10 text-center w-16 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 text-xs md:text-base flex items-center justify-center cursor-default'
                  />
                  <button
                    class='z-0 font-semibold inline-flex items-center rounded-r-md border border-l-0 h-full w-20 border-gray-300 hover:bg-gray-100 text-gray-500 bg-gray-200 text-sm focus:outline-none cursor-pointer'
                    onclick={() => model.incrementPasswordLength()}
                  >
                    <span class='m-auto'>+</span>
                  </button>
                </div>
              </div>

              <div class='mt-1 flex rounded-md shadow-sm'>
                <label for='keyword' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                  Notes
                </label>
                <textarea
                  id='notes'
                  name='notes'
                  rows='3'
                  class='shadow-sm focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                  oninput={e => model.setNotes(e.target.value)}
                />
              </div>

              <hr class='w-full' />

              <div>
                <label for='master-password' class='text-base font-medium text-gray-900'>
                  Generated Password
                </label>
                <div class='mt-1 flex rounded-md shadow-sm'>
                  <input
                    type='text'
                    readonly
                    name='generated-password'
                    id='generated-password'
                    value={model.getGeneratedPassword()}
                    class='semi-obscured focus:ring-yellow-500 focus:border-yellow-500 bg-green-200 flex-1 w-full sm:text-sm border-gray-300 inline-flex items-center px-3 rounded-l-md border border-r-0 text-gray-500 text-sm'
                  />
                  <button
                    class='w-6 transition-colors duration-500 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-200 focus:outline-none cursor-pointer'
                    onclick={() => model.copyToClipboard()}
                  >
                    <svg
                      viewBox='0 0 29 39'
                      class='text-gray-400 m-1'
                      preserveAspectRatio='xMidYMid meet'
                      stroke='currentColor'
                      fill='#ffffff'
                    >
                      <rect height='34' id='back_rect' stroke-width='2' width='24' x='4' y='1' />
                      <rect height='34' id='front_rect' stroke-width='2' width='24' x='1' y='4' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

m.mount(document.body, KhyberPassApp)
