
jest.mock('Cookie', () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    get: (name: any) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return 'OK'
    },
}))
