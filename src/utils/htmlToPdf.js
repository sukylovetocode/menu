import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install (Vue, options) {
    Vue.prototype.$getPdf = function (id_name, class_name, title) {
      // 获取当前浏览器滚动条的宽度，原理是设置一个不可见的div，查看设置scorll前后的宽度差
      function getScrollWidth () {
        var noScroll, scroll
        var oDiv = document.createElement('DIV')
        oDiv.style.cssText =
          'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;'
        noScroll = document.body.appendChild(oDiv).clientWidth
        oDiv.style.overflowY = 'scroll'
        scroll = oDiv.clientWidth
        document.body.removeChild(oDiv)
        return noScroll - scroll
      }

      const SIZE = [595.28, 841.89] // a4宽高

      let scrollWidth = getScrollWidth()
      let PDF = new JsPDF('', 'pt', 'a4')

      // 获取需要打印的页面,遍历执行
      let nodes = document.querySelectorAll(`.${class_name}`)

      for (let n = 0; n < nodes.length; n++) {
        let node = nodes[n]
        // node.style.display = 'block'

        let nodeW
        if (scrollWidth) {
          nodeW = node.clientWidth - (17 - scrollWidth)
        } else {
          nodeW = node.clientWidth
        }
        // let nodeW = node.clientWidth
        // 单页高度
        let pageH = (nodeW / SIZE[0]) * SIZE[1]
        let modules = node.children
        for (let i = 0, len = modules.length; i < len; i++) {
          let item = modules[i]
          let beforeH = item.offsetTop
          let afterH = beforeH + item.clientHeight
          let currentPage = parseInt(beforeH / pageH)
          // div距离父级的高度是pageH的倍数x,但是加上自身高度之后是pageH的倍数x+1,说明被切割
          if (currentPage !== parseInt(afterH / pageH)) {
            // 上一个元素底部距离父级的高度
            let lastItemAftarH =
              modules[i - 1].offsetTop + modules[i - 1].clientHeight
            let fill = pageH - (lastItemAftarH % pageH)
            item.style.marginTop = fill + 'px'
          }
        }
      }

      let node = document.getElementById(`${id_name}`)

      return html2Canvas(node, {
        // allowTaint: true,
        useCORS: true, // allowTaint与useCORS看情况二选一,设置 useCORS 为 true，即可开启图片跨域
        scale: 2 // 设置 scale 为 2 及以上，即可支持高分屏
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        // 一页pdf显示html页面生成的canvas高度
        let pageHeight = (contentWidth / SIZE[0]) * SIZE[1]
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // pdf页面竖向偏移
        let position = 0
        // 横向页边距
        let sidesway = 0
        // html页面生成的canvas在pdf中图片的宽高
        let imgWidth = SIZE[0] - sidesway * 2
        let imgHeight = (imgWidth / contentWidth) * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)

        if (leftHeight < pageHeight) {
          PDF.addImage(
            pageData,
            'JPEG',
            sidesway,
            position,
            imgWidth,
            imgHeight
          )
        } else {
          while (leftHeight > 0) {
            PDF.addImage(
              pageData,
              'JPEG',
              sidesway,
              position,
              imgWidth,
              imgHeight
            )
            leftHeight -= pageHeight
            position -= SIZE[1]
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }

        PDF.save(title + '.pdf')
        // for (let n = 0; n < nodes.length; n++) {
        //   let node = nodes[n]
        //   if (n !== 0) {
        //     node.style.display = 'none'
        //   }
        // }
      })
    }
  }
}
