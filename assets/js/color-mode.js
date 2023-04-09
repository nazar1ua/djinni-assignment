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
    const themeSwitcher = document.querySelectorAll('.bd-theme')

    if (!themeSwitcher[0]) {
      return
    }

    const themeSwitcherText = document.querySelectorAll('.bd-theme-text')
    const activeThemeIcon = document.querySelectorAll('.theme-icon-active')
    const btnToActive = document.querySelectorAll(`[data-bs-theme-value="${theme}"]`)
    let svgOfActiveBtn
    btnToActive.forEach(el => {
      el.querySelector('i').classList.forEach(c => {
        if (c.includes('bi-')) {
          svgOfActiveBtn = c
        }
      })
    })
    
    activeThemeIcon.forEach(el => {
      el.classList.forEach(c => {
        if (c.includes('bi-')) {
          activeThemeIcon.forEach(element => {
            element.classList.remove(c)
          })
        }
      })
    })

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.forEach(el => {
      el.classList.add('active')
      el.setAttribute('aria-pressed', 'true')
    })
    activeThemeIcon.forEach(el => {
      el.classList.add(svgOfActiveBtn)
    })
    const themeSwitcherLabel = `${themeSwitcherText[0].textContent} (${btnToActive[0].dataset.bsThemeValue})`
    themeSwitcher.forEach(el => {
      el.setAttribute('aria-label', themeSwitcherLabel)
    })

    if (focus) {
      themeSwitcher.forEach(el => {
        el.focus()
      })
    }
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
