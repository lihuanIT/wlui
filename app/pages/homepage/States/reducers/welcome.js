import React from 'react';

const initialState = {
    info: [{
        title: '关于组件库',
        icon: 'desktop',
        desc: '基于物流现有业务，抽离出一系列关于React的前端组件。主要应用于小度驿站、小度众包等产品中。'
    }, {
        title: (<span>安装
        <a href="https://www.npmjs.org/package/fivesix">
                <img src="https://img.shields.io/npm/v/fivesix.svg?style=flat-square" alt="npm package" />
            </a>
        </span>),
        icon: 'download',
        desc: (<code>
            $ <span style={{ color: '#DD4A68' }}>npm install</span> fivesix --save
    </code>)
    }, {
        title: '使用方法',
        icon: 'code-o',
        desc: (<code>
            <span style={{ color: '#07a' }}>import</span>{' { DatePicker } '}
            <span style={{ color: '#07a' }}>from </span>
            <span style={{ color: '#690' }}>'fivesix/lib/basic/TenDaysSelect'</span>;
        <br />
            ReactDOM.<span style={{ color: '#DD4A68' }}>render</span>{'(<'}
            <span style={{ color: '#BB0606;' }}>TenDaysSelect</span>
            {' />, mountNode);'}
        </code>)
    }, {
        title: 'Github',
        icon: 'github',
        desc: (<a href="https://github.com/wl-fe/FiveSixUI">
            https://github.com/wl-fe/FiveSixUI
        </a>)
    }]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
