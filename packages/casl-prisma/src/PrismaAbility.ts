import { AbilityOptions, AbilityTuple, fieldPatternMatcher, PureAbility, RawRuleFrom } from '@casl/ability';
import { ModelName } from '.prisma/casl-adapter';
import { PrismaQuery, prismaQuery } from './prisma/PrismaQuery';

type ExtendedAbilityTuple<T extends AbilityTuple> = [T[0], 'all' | T[1]];

export class PrismaAbility<
  A extends AbilityTuple = [string, ModelName],
  C extends PrismaQuery = PrismaQuery
> extends PureAbility<ExtendedAbilityTuple<A>, C> {
  constructor(
    rules?: RawRuleFrom<ExtendedAbilityTuple<A>, C>[],
    options?: AbilityOptions<ExtendedAbilityTuple<A>, C>
  ) {
    super(rules, {
      conditionsMatcher: prismaQuery,
      fieldMatcher: fieldPatternMatcher,
      ...options,
    });
  }
}
