/**
 * flink
 */

'use strict'

const { escapeHTML, url_for: urlForImpl } = require('hexo-util')
const urlFor = urlForImpl.bind(hexo)

const safeUrl = (value, allowMailto = true) => {
  if (!value) return ''

  const raw = String(value).trim()
  try {
    const parsed = new URL(raw, 'http://localhost/')
    const protocols = allowMailto ? ['http:', 'https:', 'mailto:', 'tel:'] : ['http:', 'https:']
    if (!protocols.includes(parsed.protocol)) return ''
    return raw
  } catch (error) {
    return ''
  }
}

const escape = value => escapeHTML(String(value ?? ''))

const flinkFn = (args, content) => {
  const data = hexo.render.renderSync({ text: content, engine: 'yaml' })
  let result = ''

  data.forEach(item => {
    const className = item.class_name ? `<div class="flink-name">${escape(item.class_name)}</div>` : ''
    const classDesc = item.class_desc ? `<div class="flink-desc">${escape(item.class_desc)}</div>` : ''

    const listResult = item.link_list.map(link => `
      <div class="flink-list-item">
        <a href="${escape(safeUrl(link.link))}" title="${escape(link.name)}" target="_blank" rel="noopener noreferrer">
          <div class="flink-item-icon">
            <img class="no-lightbox" src="${escape(safeUrl(link.avatar, false))}" onerror='this.onerror=null;this.src="${escape(urlFor(hexo.theme.config.error_img.flink))}"' alt="${escape(link.name)}" />
          </div>
          <div class="flink-item-name">${escape(link.name)}</div>
          <div class="flink-item-desc" title="${escape(link.descr)}">${escape(link.descr)}</div>
        </a>
      </div>`).join('')

    result += `${className}${classDesc}<div class="flink-list">${listResult}</div>`
  })

  return `<div class="flink">${result}</div>`
}

hexo.extend.tag.register('flink', flinkFn, { ends: true })
