const CraftService = require('../services/CraftService');
const formatResponse = require('../utils/formatResponse');
const CraftValidator = require('../utils/CraftValidator');
const fs = require('fs/promises');
const sharp = require('sharp');

class LearnWordController {
  static async getLearnWords(req, res) {
    try {
      const learnWords = await CraftService.getAllCrafts(); /// изменить
      if (learnWords.length === 0) {
        return res.status(200).json(formatResponse(200, 'No crafts found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', learnWords));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async createLearnWord(req, res) {
    const { worldId, userId, themeId } = req.body;
    const { user } = res.locals; // из middleware verifyAccessToken
    const { isValid, error } = CraftValidator.validate({
      title,
      desc,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation failed', null, error));
    }
    // Проверка наличия файла
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не был загружен' });
    }
    // Генерация уникального имени файла
    const name = `image_${Date.now()}.webp`;
    const outputBuffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toBuffer();
    // Создание директории, если не существует
    await fs.mkdir('./public/img', { recursive: true });

    // Сохранение файла
    await fs.writeFile(`./public/img/${name}`, outputBuffer);
    try {
      const newCraft = await CraftService.addCraft({
        title,
        desc,
        image: name,
        isSale: !!isSale,
        authorId: user.id,
      });
      if (!newCraft) {
        return res.status(400).json(formatResponse(400, 'Create failed'));
      }
      return res.status(201).json(formatResponse(201, 'Success', newCraft));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async getCraftById(req, res) {
    const { id } = res.locals;
    try {
      const oneCraft = await CraftService.getOneCraft(id);
      if (!oneCraft) {
        return res.status(400).json(formatResponse(400, 'Craft not found'));
      }
      return res.status(200).json(formatResponse(200, 'Success', oneCraft));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async updateCraft(req, res) {
    try {
      const { id } = res.locals;
      const updatedCraft = await CraftService.editCraft(id);
      if (!updatedCraft) {
        return res.status(400).json(formatResponse(400, 'Craft not found'));
      }
      return res.status(200).json(formatResponse(200, 'Success', updatedCraft));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async deleteOneCraft(req, res) {
    try {
      const { user } = res.locals;
      const { id } = res.locals;
      const deletedRes = await CraftService.deleteCraft(id, user.id);
      if (!deletedRes) {
        return res.status(400).json(formatResponse(400, 'Craft not found'));
      }
      return res.status(204).json(formatResponse(204, 'Success'));
    } catch (err) {
      console.log(err);
      if (err.message === 'Forbidden') {
        return res
          .status(403)
          .json(formatResponse(403, 'Нет прав на удаление', null, err.message));
      }
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async search(req, res) {
    const { query } = req.query;
    try {
      const crafts = await CraftService.search(query);
      if (crafts.length === 0) {
        return res.status(200).json(formatResponse(200, 'No crafts found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', crafts));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
}

module.exports = CraftController;
