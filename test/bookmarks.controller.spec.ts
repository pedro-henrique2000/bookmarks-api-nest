import { Test } from '@nestjs/testing';
import { PrismaModule } from '../src/prisma/prisma.module';
import { BookmarkController } from '../src/bookmark/bookmark.controller';
import { BookmarkService } from '../src/bookmark/bookmark.service';

describe('Bookmark Controller', () => {
  let bookmarkController: BookmarkController;
  let bookmarkService: BookmarkService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [BookmarkService],
      imports: [PrismaModule]
    }).compile();

    bookmarkService = moduleRef.get<BookmarkService>(BookmarkService);
    bookmarkController = moduleRef.get<BookmarkController>(BookmarkController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [
        {
          id: 8,
          createdAt: new Date('2022-04-27T17:59:20.228Z'),
          updatedAt: new Date('2022-04-27T17:59:20.228Z'),
          title: 'Title 123',
          description: null,
          link: 'link',
          userId: 2,
        },
        {
          id: 9,
          createdAt: new Date('2022-04-27T17:59:20.228Z'),
          updatedAt: new Date('2022-04-27T17:59:20.228Z'),
          title: 'Title 1234',
          description: null,
          link: 'link1',
          userId: 2,
        },
      ];

      const findAllBookmarkMock = async () => result;

      jest
        .spyOn(bookmarkService, 'getBookmark')
        .mockImplementation(findAllBookmarkMock);

      const res = await bookmarkController.getBookmark(2);

      expect(res).toBe(result);
      expect(res.length).toBe(result.length);
    });
  });
});
