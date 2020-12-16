enum Status {
    WAIT,
}

test('test add', function () {
    expect(1 + 2).toBe(3);
    expect(Status.WAIT).toBe(0);
});