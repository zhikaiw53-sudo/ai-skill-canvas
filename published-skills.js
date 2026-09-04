/* Published Skill bundle. Generated from the owner export on 2026-09-04T03:55:58.839Z. */
window.PUBLISHED_SKILLS_VERSION="2026-09-04T03:55:58.839Z";
window.PUBLISHED_SELECTED_SKILL_ID="skill-412549a0-8265-4716-992c-b5fc40ceb1f8";
window.PUBLISHED_SKILLS=[
  {
    "id": "skill-07d57af3-ecde-4e60-ad40-958874fccac5",
    "name": "宣传图（角色靠边）",
    "category": "宣传",
    "description": "",
    "cover": "./published-assets/01-skill-07d57af3-ecde-4e60-ad40-958874fccac5-cover.webp",
    "promptTemplate": "根据下面的要素设计一张海报。要求：16：9尺寸，高精度影视级渲染风格，写实，非常精美的画面，3D高精度渲染，角色动作张力十足，具有冲击力，重点展示角色的张力的动作姿势，电影海报级别，可以用仰视视角或者俯视视角等呈现，业界最高水准的CG级别。\n角色：（{{field:角色参考图}}）\n位于盘面的右侧，不占据中心位置，角色高度达到画面高度的80%以上，动作幅度不宜过大，不要遮挡物件\n角色设定：（{{field:角色设定}}）\n物件：（{{field:物件参考图}}）x（{{field:物件数量}}），非常巨大显眼，占据画面中心的主体地位，比角色更显眼，有着（{{field:光效颜色}}）魔法光，与角色之间有联动关系\n特效：强烈的（{{field:光效颜色}}）魔法光效氛围，由角色发出。物件的特效强度＞角色特效强度\n场景：（{{field:背景描述}}），场景参考：（{{field:场景参考图}}）。背景中间有一个盘面（{{field:盘面参考图}}），盘面占据场景80%以上，立起，正面摆放，不变形与场景结合。非常精细的刻画，画面充实，符合人物设定的场景氛围\n不要出现其他文字",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "",
    "model": "generate_image_gpt_image_2_high",
    "format": "png",
    "aspectRatio": "16:9",
    "fixedReferences": [],
    "inputFields": [
      {
        "id": "field-f95fe2fd-cc18-44d6-952b-f1b94c3a4055",
        "type": "image",
        "label": "角色参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-aef62052-857d-405a-a8f4-4e538470b327",
        "type": "text",
        "label": "角色设定",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-f2e29216-aebd-44a1-beec-cd597c1f62c3",
        "type": "image",
        "label": "物件参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-4cf0fcb0-d481-4d3c-b7a4-f6c83cedc087",
        "type": "text",
        "label": "物件数量",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-ac0825c7-b980-4862-aa35-40fcf3a01c0d",
        "type": "text",
        "label": "光效颜色",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-8c1dadfc-5666-43b8-b84c-4c88435f6a45",
        "type": "text",
        "label": "背景描述",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-6c9fa011-93f2-43c2-82e0-8a7d7031a74a",
        "type": "image",
        "label": "场景参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-14c57fe1-b874-4693-9ec0-ff9d5dbb97a4",
        "type": "image",
        "label": "盘面参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-09-04T03:04:21.682Z",
    "updatedAt": "2026-09-04T03:08:53.752Z"
  },
  {
    "id": "skill-bc9f9ec3-4608-4d46-ad67-0c3adb5618cb",
    "name": "异形按钮生成器",
    "category": "UI",
    "description": "",
    "cover": "./published-assets/02-skill-bc9f9ec3-4608-4d46-ad67-0c3adb5618cb-cover.webp",
    "promptTemplate": "（模板图）按照这个模板里按钮和文字的设计风格，设计一个海绵宝宝为主题的按钮。\n1.SPIN文字位于按钮正中央，按照主题进行设计\n2.用IP中的某个元素作为按钮底，要饱满，也可以是几个元素组合成为按钮底。按钮底的元素不要杂乱，避免缩小后显得细碎\n3.按钮底上有一到二个明显的元素，一般为左右结构，有趣丰富，但是不要杂乱。整体的元素构成了一个整体，能抓住IP特点的同时又不构成侵权。按钮上的元素可以适当超框，但别超太多，会显得按钮不够整体不美观\n4.按钮的最上方有特效层，要考虑动效，结合主题，一般是飞动、转动、流动的物体，不要生硬也不要太显眼，作为点缀\n5.要求按钮的尺寸不变，整个按钮和SPIN文字的比例完全按照模板里按钮来！长宽比为5:2，画面尺寸为16：9。",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "",
    "model": "generate_image_nano_banana_2",
    "format": "png",
    "aspectRatio": "16:9",
    "fixedReferences": [],
    "inputFields": [],
    "createdAt": "2026-09-03T04:29:49.096Z",
    "updatedAt": "2026-09-04T03:12:35.839Z"
  },
  {
    "id": "skill-4b83b080-cd27-490a-94ac-fd89883b04a8",
    "name": "SPIN按钮（常规）",
    "category": "UI",
    "description": "",
    "cover": "./published-assets/03-skill-4b83b080-cd27-490a-94ac-fd89883b04a8-cover.webp",
    "promptTemplate": "（模板参考图）完全按照这个模板里按钮和文字的形状，设计一个（{{field:主题风格}}）风格的按钮，注意按钮的形状要和参考图里的按钮形状完全一致！设计的要点参考（{{field:设计参考图}}），用两到三个物件表现，物件大小和占比超过按钮的40%。物件的位置要左右均衡\n元素只与按钮生动完美结合，物件可以略微超框。\n按钮要凸显质感，按钮整体风格一致，3D质感\nSPIN文字和下面的 HOLD FOR AUTO的文字的形状和位置完全不变，不被遮挡，但是可以根据主题改变质感和颜色\n按钮的文字和边框在形状完全不变情况下，按照主题风格进行设计、提高质感，边框别太复杂，中间的按钮底要立体，可以加一些纹理，可点击性强，有光泽质感。\n注意检查生成的按钮的形状要和模板的按钮形状完全一致！！！",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "",
    "model": "generate_image_nano_banana_2",
    "format": "png",
    "aspectRatio": "16:9",
    "fixedReferences": [
      {
        "id": "ref-d0ca6464-0ccd-4ccd-8c65-ef6c8f7673d4",
        "name": "模板参考图",
        "role": "template",
        "notes": "",
        "src": "./published-assets/03-skill-4b83b080-cd27-490a-94ac-fd89883b04a8-fixed-01.png"
      }
    ],
    "inputFields": [
      {
        "id": "field-c42456c7-558c-498d-964b-dc5929142504",
        "type": "text",
        "label": "主题风格",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-545a9aea-7799-4a42-851e-72481725336a",
        "type": "image",
        "label": "设计参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-09-03T04:11:52.844Z",
    "updatedAt": "2026-09-04T03:13:00.306Z"
  },
  {
    "id": "skill-412549a0-8265-4716-992c-b5fc40ceb1f8",
    "name": "规则框生成器",
    "category": "UI",
    "description": "",
    "cover": "./published-assets/04-skill-412549a0-8265-4716-992c-b5fc40ceb1f8-cover.webp",
    "promptTemplate": "生成一个slot的UI框，主题为：（{{field:主题描述}}）。设计风格以及边框的尺寸完全参考（{{field:参考图}}）\n盘面框符合主题，不要太复杂，设计得整体一些，边框非常细，精炼设计语言，高精度渲染，写实。边框要整体设计，尽量不要出现非常局部具体的设计，设计结构重点关注四个边角处和中间顶部的标题框，这些设计结构要和边框融为一体而不是突兀地添加一些结构\n材质：边框为（{{field:边框材质}}）材质，中间搭配（{{field:中间颜色}}）\n边框的造型和颜色风格可以参考（{{field:盘面参考图}}）\n边框顶部中间有一个标题框，标题框内有文字：ATURAN，文字风格符合盘面风格\n边框底部中间有一个长条带边框的绿色按钮，按钮上有文字：KEMBALI KE GAME，左右两侧各有一个小按钮。文字和按钮跟边框保持统一风格\n不要出现其他元素",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "",
    "model": "generate_image_gpt_image_2_high",
    "format": "png",
    "aspectRatio": "16:9",
    "fixedReferences": [
      {
        "id": "ref-957477e5-96ec-4978-bee4-17e7fd5521df",
        "name": "参考图",
        "role": "template",
        "notes": "",
        "src": "./published-assets/04-skill-412549a0-8265-4716-992c-b5fc40ceb1f8-fixed-01.png"
      }
    ],
    "inputFields": [
      {
        "id": "field-3464f90e-a57e-4e00-ae8f-9a54340a2ee2",
        "type": "text",
        "label": "主题描述",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-00be887e-a49e-4b32-946e-994cfb124573",
        "type": "text",
        "label": "边框材质",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-03f9eabf-917d-418e-ac8d-37deea7f6517",
        "type": "text",
        "label": "中间颜色",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-8f0d09f1-2c97-4064-a1b7-8adfd72f3809",
        "type": "image",
        "label": "盘面参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-09-03T03:51:19.693Z",
    "updatedAt": "2026-09-04T03:14:26.209Z"
  },
  {
    "id": "skill-64a7b71c-1c80-4323-95ba-b910b1f93464",
    "name": "GPT草图精修器",
    "category": "精修",
    "description": "把GPT的草图变得更干净",
    "cover": "./published-assets/05-skill-64a7b71c-1c80-4323-95ba-b910b1f93464-cover.webp",
    "promptTemplate": "（{{field:参考图}}）把这个草稿变成精修完成稿。画面的构图和颜色完全不变情况下，变得更加干净，不要杂乱的部分，不要粗糙的部分。每一个结构都非常清晰，细节不要过多，所有内容的构造变得合理，光效干净一些",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "",
    "model": "generate_image_gpt_image_2_high",
    "format": "png",
    "aspectRatio": "16:9",
    "fixedReferences": [
      {
        "id": "ref-fb95c7f7-3aec-44ee-b2be-c6f30f1a5295",
        "name": "参考图",
        "role": "template",
        "notes": "",
        "src": ""
      }
    ],
    "inputFields": [],
    "createdAt": "2026-09-03T03:26:58.241Z",
    "updatedAt": "2026-09-04T03:15:57.350Z"
  },
  {
    "id": "skill-premium-ui",
    "name": "宣传图（角色居中）",
    "category": "宣传",
    "description": "保持结构和颜色，增强金属、宝石和高级完成度。",
    "cover": "./published-assets/06-skill-premium-ui-cover.webp",
    "promptTemplate": "根据下面的要素设计一张海报。高精度影视级渲染风格，写实，非常精美的画面，3D高精度渲染，角色动作张力十足，具有冲击力，重点展示角色的张力的动作姿势，电影海报级别，可以用仰视视角或者俯视视角等呈现，业界最高水准的CG级别。\n角色：（{{field:角色参考图}}）\n重点展示上半身，位于画面中间，人物在画面中的占比超过60%，角色改变姿势和透视角度，非常有冲击力的姿势，非寻常视角，非寻常角度，精美写实质感\n角色设定：冥界女王，优雅高贵\n物件：（{{field:图标参考图}}）（{{field:图标数量}}），图标非常巨大显眼，占据画面中心的主体地位，可以遮挡住角色，比角色更显眼。其中一个最大的图标处于正中间，其他几个小图标分散在周围。有着魔法光，与角色之间有联动关系\n特效：强烈的（{{field:光效颜色}}）魔法光效氛围，由角色发出\n场景：（{{field:场景参考图}}），（{{field:场景描述}}），背景中间有一个框子（{{field:盘面参考图}}），占据场景七成，与场景结合。非常精细的刻画，画面充实，符合人物设定的场景氛围\n不要出现其他文字",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "premium-gothic-ui",
    "model": "generate_image_gpt_image_2_high",
    "format": "jpg",
    "aspectRatio": "1:1",
    "fixedReferences": [],
    "inputFields": [
      {
        "id": "field-4cebf622-ef26-4093-9d6b-b70f3303ffaa",
        "type": "image",
        "label": "角色参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-1e5ff3cc-a9c8-48ef-87c7-0bcaf771d638",
        "type": "image",
        "label": "图标参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-bae851b6-d321-46dd-b25e-f61134f6e48e",
        "type": "text",
        "label": "图标数量",
        "role": "instruction",
        "help": "写”X几“或者”几个“",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-f398f9c5-3a1c-4cdf-9307-ba8c2f3612c1",
        "type": "text",
        "label": "光效颜色",
        "role": "instruction",
        "help": "写”X色“",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-aee3446f-59ad-4711-ba85-6a45f1b496c7",
        "type": "image",
        "label": "场景参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-4e9734a7-2d24-4b96-930c-aa87c85299a2",
        "type": "text",
        "label": "场景描述",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-a05ff96e-0526-470f-82fd-5da509fe3ade",
        "type": "image",
        "label": "盘面参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-08-28T03:29:57.443Z",
    "updatedAt": "2026-08-28T09:52:50.202Z"
  },
  {
    "id": "skill-cinematic-gothic",
    "name": "无边框YOU WIN结算界面",
    "category": "UI界面",
    "description": "",
    "cover": "./published-assets/07-skill-cinematic-gothic-cover.webp",
    "promptTemplate": "根据下面的要素设计一个影视级海报。高精度影视级渲染风格，写实，非常精美的画面，3D高精度渲染，角色动作张力十足，具有冲击力，重点展示角色的张力的动作姿势，电影海报级别，可以用仰视视角或者俯视视角等呈现，业界最高水准的CG级别。\n角色：（{{field:角色参考图}}），改变姿势动作，完全按照图示的角色来\n重点展示上半身，角色在画面中的占比超过70%（不一定展露全身），角色改变姿势和透视角度，非常有冲击力的姿势，非寻常视角，非寻常角度，精美写实质感\n角色设定：（{{field:角色设定}}）\nUI：赢奖界面，文字标题（YOU WIN，字体样式根据主题进行设计，厚重且有设计感），奖金数字（位于画面最中央最前方，带强烈背光，非常显眼，字体样式根据主题进行设计，符合主题有设计感）\n画面逻辑：奖金数字占据最显眼的中心位置，角色做出蓄势待发的姿势来展示爆奖的奖金数字，所有内容为了奖金数字的展示而服务\n场景：（{{field:场景参考图}}），（{{field:场景描述}}），非常精细的刻画，画面充实，符合人物设定的场景氛围",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "cinematic-gothic-anime",
    "model": "generate_image_nano_banana_2",
    "format": "png",
    "aspectRatio": "16:9",
    "fixedReferences": [],
    "inputFields": [
      {
        "id": "field-ba48d225-64ca-4a78-8bfb-f0526e8ed2bf",
        "type": "image",
        "label": "角色参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-e80b03a8-8ec1-47cc-9ee3-cbe52d242927",
        "type": "text",
        "label": "角色设定",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-596a6d95-8482-4b10-a343-a737ea858f39",
        "type": "image",
        "label": "场景参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-53ccb328-ba43-4aa9-bc85-b2f3b67d3a3f",
        "type": "text",
        "label": "场景描述",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-08-28T03:29:57.443Z",
    "updatedAt": "2026-08-28T08:45:30.536Z"
  },
  {
    "id": "skill-clean-anime",
    "name": "SLOT界面生成",
    "category": "整体界面",
    "description": "",
    "cover": "./published-assets/08-skill-clean-anime-cover.webp",
    "promptTemplate": "生成一个21：9的slot界面，主题为：（{{field:slot主题风格}}）\n高精度渲染风格，写实，影视级渲染，非常新颖的风格，不要手绘感，非常精美的画面，3D高精度渲染，业界最高水准。\nUI布局：中间有一个3x5的slot盘面，位于画面正中间居中展示，占据画面70%以上比例。盘面框符合主题，不要太复杂，有设计感的同时保持一定的简洁度，不要过度装饰。盘面的顶部有四个JP框，分别为MINI（绿色），MINOR（蓝色），MAJOR（紫色），GRAND（红色），JP框和盘面框的UI结合，上面显示着符合主题风格的奖金数字。左侧的中间偏下有一个小的UI框，边框造型和中间的盘面框的UI造型接近。上面记录着每个symbol图标的分值。左侧的中间偏上有一个圆形的倍数球，上面有着倍数数字：x25，边框造型和中间的盘面框的UI造型接近。\n人物：位于盘面的右侧，高精度写实渲染，非常有设计感，不落俗套，露出全身，设计别太复杂，凝练设计语言\n场景：按照主题设计，高精度渲染\n盘面更凸显一点，更明显，注意颜色的搭配",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "clean-anime-final",
    "model": "generate_image_nano_banana_pro",
    "format": "jpg",
    "aspectRatio": "1:1",
    "fixedReferences": [],
    "inputFields": [
      {
        "id": "field-844ac6a3-108f-4322-a159-e1a7cffe958c",
        "type": "text",
        "label": "slot主题风格",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-08-28T03:29:57.450Z",
    "updatedAt": "2026-08-28T08:31:11.257Z"
  },
  {
    "id": "skill-c7a16828-6bf4-420f-9f7d-17271d1302dc",
    "name": "LOADING生成器",
    "category": "插画",
    "description": "角色表现为主，不带规则信息",
    "cover": "./published-assets/09-skill-c7a16828-6bf4-420f-9f7d-17271d1302dc-cover.webp",
    "promptTemplate": "根据下面的要素设计一张海报。要求：16：9尺寸，高精度影视级渲染风格，写实，非常精美的画面，3D高精度渲染，角色动作张力十足，具有冲击力，重点展示角色的张力的动作姿势，电影海报级别，可以用仰视视角或者俯视视角等呈现，业界最高水准的CG级别。\n角色：（{{field:角色参考图}}）（改变姿势动作，完全按照图示的角色来）\n重点展示上半身，人物在画面中的占比超过70%，占据绝对主体位置，角色改变姿势和透视角度，非常有冲击力的姿势，非寻常视角，非寻常角度，精美写实质感\n角色设定：（{{field:角色描述}}）\n场景：场景参考（{{field:场景参考图}}），不要照搬场景，根据画面需要采用其中元素重新构造。非常精细的刻画，画面充实，符合人物设定的场景氛围\n2K",
    "fixedPrompt": "",
    "negativePrompt": "",
    "style": "",
    "model": "generate_image_nano_banana_pro",
    "format": "jpg",
    "aspectRatio": "16:9",
    "fixedReferences": [],
    "inputFields": [
      {
        "id": "field-8d22b12e-b01e-470d-b625-76b56318647f",
        "type": "image",
        "label": "角色参考图",
        "role": "reference",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      },
      {
        "id": "field-d48ba0c6-0dab-46c8-bc4c-6b2d284abe2a",
        "type": "text",
        "label": "角色描述",
        "role": "instruction",
        "help": "",
        "required": false,
        "multiple": false,
        "maxItems": 1,
        "placeholder": ""
      },
      {
        "id": "field-bb3ddd9b-efd6-4746-9f5b-e58e31149aef",
        "type": "image",
        "label": "场景参考图",
        "role": "background",
        "help": "",
        "required": false,
        "multiple": true,
        "maxItems": 3,
        "placeholder": ""
      }
    ],
    "createdAt": "2026-08-28T04:02:48.407Z",
    "updatedAt": "2026-08-28T07:23:50.756Z"
  }
];
