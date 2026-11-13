# Course Catalog — Lab 8 frontend

Next.js 16.4.6, React 19.3.1 и TypeScript. Фронтенд создан заново для Lab 8. Две серверные страницы показывают одинаковый учебный план студента 2 из PostgreSQL через API.

Репозитории: [backend — lab8](https://github.com/GitKry12/lab8) · [frontend — lab8frontend](https://github.com/GitKry12/lab8frontend).

## Запуск

Нужен Node.js 20.9+ (проверено на 24.21) и запущенный backend Lab 8 на порту 8000. В PowerShell из этой папки:

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

`.env.local` содержит `API_URL=http://127.0.0.1:8000`. Это серверная переменная: браузер не обращается к API напрямую. После изменения адреса перезапустите Next.js. `.env.local` не хранится в Git.

- [Мои курсы — GraphQL](http://127.0.0.1:3000/my-courses)
- [Мои курсы — REST](http://127.0.0.1:3000/my-courses-rest)
- [Каталог](http://127.0.0.1:3000/courses)

Страницы показывают Daniyar Bekov и три курса по 5 кредитов. Переключатель GraphQL / REST меняет способ получения данных. Общий `StudyPlan` сохраняет одинаковое отображение. В задании студент 2 выбран явно; авторизация не входит в Lab 8.

## Как работают запросы

`lib/api.ts`: GET с `cache: "no-store"`, проверка HTTP-статуса.

`lib/graphql.ts`: POST `/graphql` с query и variables, проверка HTTP-статуса **и** массива `errors`. Ошибки GraphQL поднимаются как `GraphQLRequestError`, содержащий исходные сообщения. Ожидаемые ошибки мутаций в `userErrors` должен проверять вызывающий код мутации; страницы здесь выполняют только query.

`app/my-courses-rest/page.tsx` сначала параллельно получает студента и записи, затем параллельно получает три курса. Итого 5 HTTP-запросов в 2 раунда.

`app/my-courses/page.tsx` выполняет MyCourses с вложенными полями. Итого 1 HTTP-запрос. Nullable student проверяется до отображения. GET-запросы и GraphQL POST выполняются при каждом показе страницы; предварительная загрузка навигационных ссылок отключена для ясного сравнения логов.

## Проверка

```powershell
npm.cmd run build
npm.cmd run typecheck
```

Production build прошёл. `/courses`, `/my-courses`, `/my-courses-rest` отмечены `ƒ Dynamic`. Через HTTP и браузер проверено совпадение трёх курсов и кредитов; в логе backend — пять GET против одного POST. Есть адаптивная вёрстка, состояние загрузки и error boundary с повторной попыткой.

В эксперименте 8 временно проверялись три сбоя, затем рабочие файлы восстановлены:

| Сбой | Сообщение в серверном логе |
|---|---|
| `titel` в GraphQL query | `GraphQLRequestError: Cannot query field 'titel' …` |
| Та же опечатка без проверки `errors` | `TypeError: Cannot destructure property 'student' … null` |
| Остановленный API | `TypeError: fetch failed` |

Из-за `loading.tsx` Next.js начинает streaming до ошибки, поэтому HTTP-статус внешней страницы в этих опытах был 200; ошибка передаётся error boundary и записывается в лог. Статус не заменяет проверку GraphQL `errors`.

Полные измерения и журнал восьми экспериментов находятся в README backend и его папке `evidence`.
