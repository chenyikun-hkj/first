import DbConnection from '../../src/db/DbConnection'

afterAll(() => DbConnection.ins.close());

function hasProperty(target: any) {
    expect(target).toHaveProperty('id');
    expect(target).toHaveProperty('name');
}

describe('test db query', function () {

    test('test db query all', async function () {
        const sql = 'select * from testusers';

        const rows = await DbConnection.ins.query<{ id: number, name: string }>(sql);
        expect(rows.length).toBeGreaterThan(0);
        rows.forEach(hasProperty);
    }, 1000 * 60);

    test('test db query one exits', async function () {
        const sql = 'select * from testusers where id = ?';
        const params = [1];

        const rows = await DbConnection.ins.query<{ id: number, name: string }>(sql, params);
        expect(rows).toHaveLength(1);
        hasProperty(rows[0]);
    }, 1000 * 60);

    test('test db query one not exits', async function () {
        const sql = 'select * from testusers where id = ?';
        const params = [-1];

        const rows = await DbConnection.ins.query<{ id: number, name: string }>(sql, params);
        expect(rows).toHaveLength(0);
    }, 1000 * 60);
});
