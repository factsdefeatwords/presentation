import { provide, inject, reactive, createApp, h } from 'vue';
const ToastSymbol = Symbol();

const globalConfig = {
    type: 'bottom', // toast位置
    duration: 2500, // 持续时长
    wordWrap: false, // 是否自动换行
    width: 'auto' // 宽度
};

const state = reactive({
    show: false, // toast元素是否显示
    text: ''
});

let [toastTimer, toastVM, toastWrapper] = [null, null, null];

const _toast = text => {
    state.show = true;
    state.text = text;
    if (!toastVM) {
        // 如果toast实例存在则不重新创建
        toastVM = createApp({
            setup() {
                return () =>
                    h(
                        'div',
                        {
                            // 这里是根据配置显示一样不同的样式
                            class: [
                                'lx-toast',
                                `lx-toast-${globalConfig.type}`,
                                globalConfig.wordWrap ? 'lx-word-wrap' : ''
                            ],
                            style: {
                                display: state.show ? 'block' : 'none',
                                width: globalConfig.width
                            }
                        },
                        state.text
                    );
            }
        });
    }

    if (!toastWrapper) {
        // 如果该节点以经存在则不重新创建
        toastWrapper = document.createElement('div');
        toastWrapper.id = 'lx-toast';
        document.body.appendChild(toastWrapper);
        toastVM.mount('#lx-toast');
    }
    if (toastTimer) clearTimeout(toastTimer);
    // 定时器，持续时长之后隐藏
    toastTimer = setTimeout(() => {
        state.show = false;
        clearTimeout(toastTimer);
    }, globalConfig.duration);
};

export function provideToast(config = {}) {
    for (const key in config) {
        globalConfig[key] = config[key];
    }
    provide(ToastSymbol, _toast);
}

export function useToast() {
    const toast = inject(ToastSymbol);
    if (!toast) {
        throw new Error('error');
    }
    return toast;
}