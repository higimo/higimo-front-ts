import { describe, test, expect, beforeEach } from 'vitest'
import { getProjectText } from './getProjectText'

describe('getProjectText - расширенные тесты', () => {
    beforeEach(() => {
        // @ts-ignore for unit-test
        global.location = { pathname: '/projects/my-project' }
    })
  
    test('работает с текстом, содержащим только ./asset', () => {
        expect(getProjectText('./asset/logo.png')).toBe('/assets/projects/my-project/asset/logo.png')
    })
  
    test('не изменяет уже абсолютные пути', () => {
        const inputs = [
            '/assets/logo.png',
            'https://example.com/asset/image.jpg',
            'http://site.com/asset/file.txt',
            '//cdn.example.com/asset/data.json',
        ]
        
        inputs.forEach(input => {
            expect(getProjectText(input)).toBe(input)
        })
    })
  
    test('обрабатывает сложный Markdown/HTML', () => {
        const markdown = [
            '# Заголовок',
            '',
            '![Изображение](./asset/photo.jpg)',
            '',
            'Ссылка на [документ](./asset/doc.pdf)',
            '',
            '```',
            'Код без изменений',
            '```',
        ].join('\n')
        
        const result = getProjectText(markdown)
        
        expect(result).toContain('/assets/projects/my-project/asset/photo.jpg')
        expect(result).toContain('/assets/projects/my-project/asset/doc.pdf')
        expect(result).toContain('Код без изменений')
    })
  
    test('работает с путями, похожими на ./asset', () => {
        const inputs = [
            { input: 'test.asset', expected: 'test.asset' },
            { input: '.asset', expected: '.asset' },
        ]
        
        inputs.forEach(({ input, expected }) => {
            expect(getProjectText(input)).toBe(expected)
        })
    })
  
    test('производит замену только точного совпадения', () => {
        expect(getProjectText('./asset')).toBe('/assets/projects/my-project/asset')
        expect(getProjectText('. /asset')).toBe('. /asset')
        expect(getProjectText('.. /asset')).toBe('.. /asset')
    })
    
    test('производит множественные замены в одной строке', () => {
        const input = './asset/1.png ./asset/2.png ./asset/3.png'
        const result = getProjectText(input)
        const count = (result.match(/\/assets\/projects\/my-project\/asset/g) || []).length
        expect(count).toBe(3)
    })
})

describe('getProjectText - производительность', () => {
    test('быстро обрабатывает большие тексты', () => {
        const assetLinks = Array(1000).fill('./asset/image.png').join('\n')
        const otherText = 'Текст без замен '.repeat(1000)
        const largeText = assetLinks + '\n' + otherText
        
        const startTime = performance.now()
        const result = getProjectText(largeText)
        const endTime = performance.now()
        
        expect(result).toContain('/assets/projects/my-project/asset/image.png')

        expect(endTime - startTime).toBeLessThan(0.15)
    })
})