import 'tailwindcss/tailwind.css'
import 'text-security/text-security.css'
import './app.css'
import model from './modules/khybermodel.js'

const m = require('mithril')

function KhyberPassApp() {
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
                  class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300'
                  oninput={e => model.setKeyword(e.target.value)}
                />
                <button
                  class='px-1 w-6 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 focus:outline-none cursor-pointer'
                  onclick={model.save()}
                >
                  <svg viewBox='0 0 486 486'>
                    <g>
                      <g>
                        <path d='M473.7,485.75c6.8,0,12.3-5.5,12.3-12.3v-359.8c0-3.6-1.6-7-4.3-9.3L363,2.85c-0.2-0.2-0.4-0.3-0.6-0.4    c-0.3-0.2-0.5-0.4-0.8-0.6c-0.4-0.2-0.7-0.4-1.1-0.6c-0.3-0.1-0.6-0.3-0.9-0.4c-0.4-0.2-0.9-0.3-1.3-0.4c-0.3-0.1-0.6-0.2-0.9-0.2    c-0.8-0.1-1.5-0.2-2.3-0.2H12.3C5.5,0.05,0,5.55,0,12.35v461.3c0,6.8,5.5,12.3,12.3,12.3h461.4V485.75z M384.5,461.25h-283v-184.1    c0-3.7,3-6.6,6.6-6.6h269.8c3.7,0,6.6,3,6.6,6.6V461.25z M161.8,24.45h180.9v127.8c0,0.8-0.6,1.4-1.4,1.4h-178    c-0.8,0-1.4-0.7-1.4-1.4V24.45H161.8z M24.6,24.45h112.8v127.8c0,14.3,11.6,25.9,25.9,25.9h178c14.3,0,25.9-11.6,25.9-25.9V38.75    l94.2,80.6v341.9H409v-184.1c0-17.2-14-31.1-31.1-31.1H108.1c-17.2,0-31.1,14-31.1,31.1v184.2H24.6V24.45z' />
                        <path d='M227.4,77.65h53.8v32.6c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-44.8c0-6.8-5.5-12.3-12.3-12.3h-66.1    c-6.8,0-12.3,5.5-12.3,12.3S220.7,77.65,227.4,77.65z' />
                        <path d='M304.5,322.85h-123c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h123c6.8,0,12.3-5.5,12.3-12.3    S311.3,322.85,304.5,322.85z' />
                        <path d='M304.5,387.75h-123c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h123c6.8,0,12.3-5.5,12.3-12.3    S311.3,387.75,304.5,387.75z' />
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
                  <input
                    type='text'
                    readonly
                    name='generated-password'
                    id='generated-password'
                    value={model.getGeneratedPassword()}
                    class='semi-obscured focus:ring-yellow-500 focus:border-yellow-500 bg-green-200 flex-1 w-full sm:text-sm border-gray-300 inline-flex items-center px-3 rounded-l-md border border-r-0 text-gray-500 text-sm'
                  />
                  <button
                    class='w-6 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 focus:outline-none cursor-pointer'
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
