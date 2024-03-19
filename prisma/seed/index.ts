import { createTestArticles } from './test-articles';
import { createTestUsers } from './test-users';

// テストデータ登録用関数
const seed = async () => {
  await createTestArticles();
  await createTestUsers();
};

seed();
