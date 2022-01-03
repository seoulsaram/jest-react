import HabitPresenter from '../habit_presenter';

describe('HabitPresenter', () => {
  const habits = [
    {id: 1, name: 'Reading', count: 1},
    {id: 2, name: 'Running', count: 0},
  ];
  let presenter;
  let update;
  beforeEach(() => {
    presenter = new HabitPresenter(habits);
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

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1); //해당 함수가 몇 번 호출되었는지 확인
    expect(update).toHaveBeenCalledWith(presenter.getHabits()); //해당 함수가 어떤 값과 실행되었는지 확인
  }
});
