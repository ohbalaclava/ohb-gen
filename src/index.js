import 'tailwindcss/tailwind.css'
import './app.css'
import model from './modules/khybermodel.js'

const m = require('mithril')

function MyComponent () {
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
                  type='password'
                  name='master-password'
                  id='master-password'
                  class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
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
                  class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                  oninput={e => model.setKeyword(e.target.value)}
                />
                <datalist id='keywords' />
              </div>

              <fieldset>
                <legend class='text-base font-medium text-gray-900'>Include</legend>
                <div class='mt-2 space-y-4'>
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

              <div class='flex items-start'>
                <div class='mt-1 flex rounded-md shadow-sm'>
                  <label for='contains-not' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                    Illegal characters
                  </label>
                  <input
                    type='password'
                    name='contains-not'
                    id='contains-not'
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
                    max='128'
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
                  <input type='password' name='master-password' id='master-password' class='focus:ring-yellow-500 focus:border-yellow-500 bg-green-200 flex-1 block w-full rounded-md sm:text-sm border-gray-300' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

m.mount(document.body, MyComponent)
