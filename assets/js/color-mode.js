/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const storedTheme = localStorage.getItem('theme')

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    if (!localStorage.getItem('theme')) theme = 'auto'

    const themeSwitcher = document.querySelectorAll('.bd-theme')

    themeSwitcher.forEach(switcher => {
      if (!switcher) {
        return
      }
      const switcherParent = switcher.parentElement

      const themeSwitcherText = switcherParent.querySelector('.bd-theme-text')
      const activeThemeIcon = switcherParent.querySelector('.theme-icon-active use')
      const btnToActive = switcherParent.querySelector(`[data-bs-theme-value="${theme}"]`)
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

      switcherParent.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })

      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)

      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      switcher.setAttribute('aria-label', themeSwitcherLabel)

      if (focus) {
        switcher.focus()
      }
    })
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          document.documentElement.classList.add('no-transition')
          const theme = toggle.getAttribute('data-bs-theme-value')
          localStorage.setItem('theme', theme)
          setTheme(theme)
          showActiveTheme(theme, true)
          setTimeout(() => {
            document.documentElement.classList.remove('no-transition')
          }, 0)
        })
      })
  })
})()
