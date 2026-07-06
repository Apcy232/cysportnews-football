insert into competitions (
  name,
  slug,
  country
) values (
  'Cyprus First Division',
  'cyprus-first-division',
  'Cyprus'
) on conflict (slug) do update
set
  name = excluded.name,
  country = excluded.country;
