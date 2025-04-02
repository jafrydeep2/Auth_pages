# 🌐 Multilingual Web Application Structure

## 📁 Project Organization

This web application is organized to support both **English** and **Russian** languages with a clear separation of resources.

### 📂 Root Structure

```
├── 📂 assets/
│   └── 📂 images/      # Shared images for all languages
├── 📂 ru/              # Russian language HTML pages
├── 📂 scripts/         # English JavaScript files
├── 📂 scripts-ru/      # Russian JavaScript files
├── 📂 styles/          # Shared styles and templates
└── 📄 *.html           # English HTML pages
```

### 🇬🇧 English Resources

| Resource Type | Location                     |
| ------------- | ---------------------------- |
| HTML Pages    | Root directory (`/*.html`) |
| JavaScript    | `/scripts/*.js`            |

**Available Pages:**

* 🔐 `login.html` - User authentication
* 📝 `signup.html` - New user registration
* 🔑 `forgot-password.html` - Password recovery
* 🏠 `index.html` - Home page

### 🇷🇺 Russian Resources

| Resource Type | Location             |
| ------------- | -------------------- |
| HTML Pages    | `/ru/*.html`       |
| JavaScript    | `/scripts-ru/*.js` |

**Available Pages:**

* 🔐 `ru/login.html` - Аутентификация пользователя
* 📝 `ru/signup.html` - Регистрация нового пользователя
* 🔑 `ru/forgot-password.html` - Восстановление пароля
* 🏠 `ru/index.html` - Домашняя страница

### 🎨 Shared Resources

* **Styles:** `/styles/custom.css`
* **Images:** `/assets/images/*`

## 📋 File Reference

### JavaScript Files

| English                            | Russian                            |
| ---------------------------------- | ---------------------------------- |
| `/scripts/login.js`              | `/scripts-ru/login.js`           |
| `/scripts/signup.js`             | `/scripts-ru/signup.js`          |
| `/scripts/forgot-password.js`    | `/scripts-ru/forgot-password.js` |
| `/scripts/forgot-password-ru.js` | -                                  |

## 🔄 Language Switching

Users can navigate between language versions by switching between equivalent pages in the root and `/ru/` directories.

---

*This structure ensures clean separation of language-specific content for easy maintenance and localization.*
