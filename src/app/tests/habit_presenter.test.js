import HabitPresenter from '../habit_presenter';

describe('HabitPresenter', () => {
  const habits = [
    {id: 1, name: 'Reading', count: 1},
    {id: 2, name: 'Running', count: 0},
  ];
  let presenter;
  let update;
  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it('inits with habits', () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it('increments habit count and call update callback', () => {
    presenter.increment(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it('decrements habit count and call update callback', () => {
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('does not set the count value below 0 when decrements', () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it('deletes habit from the list', () => {
    presenter.delete(habits[0], update);
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe('Running');
    checkUpdateIsCalled();
  });

  it('adds habit to the list', () => {
    presenter.add('Eating', update);
    expect(presenter.getHabits().length).toBe(3);
    expect(presenter.getHabits()[2].name).toBe('Eating');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('throws an error when the max habits limit is exceeded', () => {
    presenter.add('Eating', update);
    expect(() => {
      presenter.add('Sleeping', update);
    }).toThrow();
    checkUpdateIsCalled();
  });

  describe('rest', () => {
    it('resets all habit counts to 0', () => {
      presenter.reset(update);
      presenter.getHabits().forEach((item) => {
        expect(item.count).toBe(0);
      });
      checkUpdateIsCalled();
    });

    //count가 0이 아닌 아이템에 한해서만 새로운 오브젝트를 리턴하는지- 에 대한 test를 작성하자
    it('does not create new object when count is 0', () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updatedHabits = presenter.getHabits();

      //expect(updatedHabits[1]).toEqual(habits[1]); => toEqual은 오브젝트의 값만 비교
      expect(updatedHabits[1]).toBe(habits[1]); //=> toBe는 오브젝트의 reference를 비교
      checkUpdateIsCalled();
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1); //해당 함수가 몇 번 호출되었는지 확인
    expect(update).toHaveBeenCalledWith(presenter.getHabits()); //해당 함수가 어떤 값과 실행되었는지 확인
  }
});
