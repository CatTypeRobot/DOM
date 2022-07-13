window.dom = {
    create(string) {    //创建节点
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, node2) {    //新增弟弟
        console.log(node.nextSibling)
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2) {   //新增哥哥
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {  //新增儿子
        parent.appendChild(node)
    },
    wrap(node, parent) {    //新增爸爸
        dom.before(node, parent)
        dom.append(parent, node)
    },
    /* 以上为增 */
    remove(node) {  //删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {   //删除后代
        const array = []
        let child = node.firstChild
        while (child) {  //用while的原因：chileNodes.length会改变
            array.push(dom.remove(node.firstChild))
            child = node.firstChild
        }
        return array
    },
    /* 以上为删 */
    attr(node, name, value) {   //读写属性
        if (arguments.length === 3) {    //重载
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {    //读写内容
        if (arguments.length === 2) {
            if ('innerText' in node) {    //适配
                node.innerText = string    //兼容IE
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {    //读写HTML内容
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {  //读写style
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {  //添加class
            node.classList.add(className)
        },
        remove(node, className) {   //删除class
            node.classList.remove(className)
        },
        has(node, className) {  //查询是否有指定class
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {   //添加事件监听
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {  //移除事件监听
        node.removeEventListener(eventName, fn)
    },
    /* 以上为改 */
    find(selector, scope) { //查找标签
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {  //爸爸在哪里
        return node.parentNode
    },
    children(node) {    //找儿子
        return node.children
    },
    siblings(node) {    //找兄弟们
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {    //找弟弟
        let isBro = node.nextSibling
        while (isBro && isBro.nodeType === 3) {
            isBro = isBro.nextSibling
        }
        return isBro
    },
    previous(node) {    //找哥哥
        let isBro = node.previousSibling
        while (isBro && isBro.nodeType === 3) {
            isBro = isBro.previousSibling
        }
        return isBro
    },
    each(nodeList, fn) {    //遍历全部兄弟
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {   //查排行老几
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
    /* 以上为查 */
}