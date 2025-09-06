
export type MessagesSchema = typeof import('../messages/pt.json') | typeof import('../messages/en.json') | typeof import('../messages/es.json')  | typeof import('../messages/ko.json')| typeof import('../messages/zh.json') | typeof import('../messages/{locale}.json');

