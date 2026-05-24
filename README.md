# Princess Diary Web

3주간의 선택으로 공주의 성격과 결말을 만들어가는 내러티브 웹 게임입니다.

## How It Works

- **3주 동안** 매주 3개 활동 중 1개 선택 (에티켓 훈련, 아카이브 연구, 야간 순찰 등)
- 각 활동이 **스탯** (grace/wit/nerve), **측근 관계** (tutor/maid/guard), **성격 태그**를 축적
- 3주 후 **다이어리 페이지** + **엔딩 원인 페이지** 생성 — 두 페이지가 동일한 공주를 묘사하는지가 핵심

## Tech Stack

- Vanilla JavaScript (ES Modules)
- Vite 8
- IndexedDB (세이브 저장)
- Vercel 배포

## Getting Started

```bash
npm install --include=dev
npm run dev
```

## Commands

```bash
npm run check     # 린트/검증
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
```

## License

MIT
