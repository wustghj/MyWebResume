export interface Metric {
  value: string
  label: string
}

export interface SubSection {
  title: string
  bullets: string[]
  techTags?: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  projectTitle: string
  subtitle: string
  subSections: SubSection[]
  metrics?: Metric[]
  techStack: string[]
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export const personalInfo = {
  name: '甘鸿谨',
  nameEn: 'Gan Hongjin',
  title: 'C++ Backend Developer',
  tagline: '专注于高性能网络编程与分布式系统，金融级消息中间件与量化交易平台研发经验',
  email: 'libailinux0@gmail.com',
  phone: '15623662523',
  github: 'github.com/wustghj',
  pdfPath: '/甘鸿谨_C++后端开发.pdf',
}

export const skillGroups: SkillGroup[] = [
  {
    category: '语言与核心',
    skills: ['C++11/14/17', 'STL', 'Boost', '模板元编程', '多线程(std::thread/pthread/asio)'],
  },
  {
    category: '网络与并发',
    skills: ['TCP/UDP', 'epoll/kqueue', 'libevent/libev/asio', 'Protobuf/flatbuffers', '高并发网络编程'],
  },
  {
    category: '系统与工具',
    skills: ['Linux 系统编程', '内存管理(智能指针/内存池/RAII)', '性能优化', 'Git', 'CMake', 'GDB', 'Valgrind', 'Google Benchmark'],
  },
  {
    category: '数据库与中间件',
    skills: ['MySQL 索引优化/连接池/主从复制', 'Redis 高可用/集群', 'gRPC/brpc', 'TARS Framework', 'Docker/K8s'],
  },
]

export const experiences: Experience[] = [
  {
    id: 'kingmq',
    company: '上海金仕达软件科技股份有限公司',
    role: 'C++开发工程师',
    period: '2025.03 – 2026.01',
    projectTitle: 'KingMQ C++ SDK (kmq-cpp-sdk)',
    subtitle: '为招商银行开发的高性能消息队列SDK · 已上线交付招商银行生产环境',
    subSections: [
      {
        title: '架构与核心实现',
        bullets: [
          '基于 C++11 + Boost + Protobuf + 自研 KMQP 协议，独立完成 Producer/Consumer、事务消息、Req/Rsp 模型',
          '实现流控（max_prefetch + 阈值系数）、消息压缩（snappy/lz4）及多 Topic/Partition 支持',
        ],
        techTags: ['C++11', 'Boost', 'Protobuf', 'KMQP', 'Snappy', 'LZ4'],
      },
      {
        title: '跨平台异步 IO 引擎',
        bullets: [
          '自研 Poller 抽象层（Linux epoll + Windows IOCP），集成 AsynchIO Buffer 队列、完成端口回调及 ThreadPool',
          '采用 std::atomic + lock-free 机制保障多 Session 线程安全',
        ],
        techTags: ['epoll', 'IOCP', 'Lock-free', 'ThreadPool'],
      },
      {
        title: '高可用与稳定性',
        bullets: [
          '实现心跳检测（可配置间隔）、自动重连、故障转移重订阅、消息 Ack 防重/编号回退逻辑',
          '修复多连接线程池重复创建、死锁、MessageAck 悬空引用等线上级 Bug',
          'SDK 在断网/主备切换场景下可用性达 99.99%+（压测验证）',
        ],
      },
      {
        title: '性能优化与可观测性',
        bullets: [
          '重构发送/接收链路（v2.0.2 → v3.1.13），引入自研 CPerfStat 框架 + gperftools 集成',
          '集成 Prometheus 客户端库暴露核心指标（消息吞吐、延迟分布 P99/P999、错误率等），结合 Grafana 实现实时监控与阈值告警',
        ],
        techTags: ['Prometheus', 'Grafana', 'gperftools'],
      },
      {
        title: '多语言生态',
        bullets: [
          '落地滚动日志、批量 Ack 配置、灵活回调机制',
          '提供 pybind11 Python 绑定、.NET 封装及完整 API 文档 + 升级指南',
        ],
        techTags: ['pybind11', '.NET', 'Python'],
      },
    ],
    metrics: [
      { value: '百万 TPS', label: '单机峰值吞吐' },
      { value: '~100μs', label: '平均端到端延迟' },
      { value: '~250μs', label: 'P99 尾延迟' },
    ],
    techStack: ['C++11', 'Boost', 'Protobuf', 'epoll', 'IOCP', 'Prometheus', 'Grafana', 'pybind11', 'Snappy', 'LZ4'],
  },
  {
    id: 'rdstgy',
    company: '上海金仕达软件科技股份有限公司',
    role: 'C++开发工程师',
    period: '2024.07 – 2025.09',
    projectTitle: '瑞达期货 RDStgy 量化交易平台',
    subtitle: '期货微服务交易系统 · 已上线 iOS/Android/Windows',
    subSections: [
      {
        title: '核心代理层',
        bullets: [
          '主导 CTPProxyServer 与 V8TProxyServer 开发：实现 CTP/V8T 柜台协议接入、订单路由、风控前置校验与实时成交回报',
          '每个 Proxy 进程限 100 账户，通过多实例 + etcd 分布式锁实现水平扩展，支持超千级资金账户并发',
        ],
        techTags: ['CTP', 'V8T', 'etcd'],
      },
      {
        title: '分布式交易代理架构',
        bullets: [
          '负责 KSFTProxyServer（C++）与 V8TProxyServer（Go 协作），结合 KSF 框架、Kedis 缓存与 etcd 分布式存储/锁',
          '实现高可用路由（RouterServer / StrategyRouterServer）、负载均衡与故障转移',
        ],
        techTags: ['KSF', 'Kedis', 'etcd', 'Go'],
      },
      {
        title: '中间层服务',
        bullets: [
          '独立开发 BypassProxyServer / BypassStoreServer / EngineForCondServer 等中间层服务',
          '实现条件单引擎、旁路存储与代理转发逻辑，支持复杂策略在微服务间的低延迟执行',
        ],
      },
      {
        title: '数据层优化',
        bullets: [
          '负责 KSArchiveServer / KSBasicServer / KSDataStorageServer，处理海量行情/成交/持仓数据存储与归档',
          '使用 KSF + etcd 实现分布式一致性，降低数据查询延迟，提升风控与清算效率',
        ],
        techTags: ['KSF', 'etcd'],
      },
    ],
    metrics: [
      { value: '毫秒级', label: '订单穿透延迟' },
      { value: '千级', label: '并发资金账户' },
    ],
    techStack: ['C++', 'Go', 'KSF', 'etcd', 'Kedis', 'CTP', 'V8T', '微服务'],
  },
]

export const internship = {
  company: '金山办公软件有限公司',
  role: 'C++软件开发实习生',
  period: '2023.06 – 2023.09',
  project: 'WPS 看图模块稳定性优化与自动化测试',
  bullets: [
    '使用 WinDbg 分析崩溃 dump，定位并修复 WPS 看图 Windows 端多个崩溃 Bug',
    '独立优化缩略图缓存机制：将原 Windows API 调用改为内嵌 SQLite 多线程读取，热启动速度提升 10 倍',
    '独立开发自动化稳定性测试工具：基于 Airtest + OpenCV 实现操作自动化与异常界面监视，结合状态机生成随机场景用例',
  ],
  techStack: ['WinDbg', 'SQLite', 'Airtest', 'OpenCV', 'Python', 'C++'],
}

export const education = {
  school: '武汉科技大学',
  major: '计算机科学与技术',
  degree: '本科',
  period: '2020.09 – 2024.06',
}

export const githubInfo = {
  url: 'github.com/wustghj',
  contributions: [
    'Contributor to RX-Explorer (796★, UWP/C#)',
    'Contributor to easyChat (1.3K★, Python)',
    'PR 被 merge 并在 release 致谢',
  ],
}
