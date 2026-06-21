install:
	docker compose exec server npm i $(filter-out install,$(MAKECMDGOALS))
	cd server && npm install

%:
	@:

generate:
	docker compose exec server npx prisma generate
	cd server && npx prisma generate

migrate:
	docker compose exec server npx prisma migrate dev $(name)
	cd server && npx prisma generate


