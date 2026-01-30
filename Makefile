.PHONY: help dev prod build up down restart logs clean

# Кольори
GREEN := \033[0;32m
BLUE := \033[0;34m
RED := \033[0;31m
NC := \033[0m

help: ## Показати допомогу
	@echo "$(BLUE)Доступні команди:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

# ============================================
# DEVELOPMENT
# ============================================

dev: ## Запустити в development режимі
	@echo "$(BLUE)Запуск в development режимі...$(NC)"
	docker-compose up

dev-build: ## Білд та запуск development
	@echo "$(BLUE)Білд та запуск development...$(NC)"
	docker-compose up --build

dev-d: ## Запустити в development у фоні
	@echo "$(BLUE)Запуск в development у фоні...$(NC)"
	docker-compose up -d

# ============================================
# PRODUCTION
# ============================================

prod: ## Запустити в production режимі
	@echo "$(BLUE)Запуск в production режимі...$(NC)"
	docker-compose --env-file .env.production up

prod-build: ## Білд та запуск production
	@echo "$(BLUE)Білд та запуск production...$(NC)"
	docker-compose --env-file .env.production up --build

prod-d: ## Запустити production у фоні
	@echo "$(BLUE)Запуск production у фоні...$(NC)"
	docker-compose --env-file .env.production up -d

# ============================================
# УПРАВЛІННЯ
# ============================================

build: ## Тільки білд образів
	@echo "$(BLUE)Білд Docker образів...$(NC)"
	docker-compose build

up: ## Запустити сервіси
	@echo "$(BLUE)Запуск сервісів...$(NC)"
	docker-compose up

down: ## Зупинити сервіси
	@echo "$(RED)Зупинка сервісів...$(NC)"
	docker-compose down

restart: ## Перезапустити сервіси
	@echo "$(BLUE)Перезапуск сервісів...$(NC)"
	docker-compose restart

# ============================================
# ЛОГИ
# ============================================

logs: ## Всі логи
	docker-compose logs -f

logs-backend: ## Логи backend
	docker-compose logs -f backend

logs-frontend: ## Логи frontend
	docker-compose logs -f frontend

# ============================================
# SHELL
# ============================================

shell-backend: ## Shell в backend контейнері
	docker-compose exec backend sh

shell-frontend: ## Shell в frontend контейнері
	docker-compose exec frontend sh

# ============================================
# ОЧИЩЕННЯ
# ============================================

clean: ## Видалити контейнери та volumes
	@echo "$(RED)Очищення...$(NC)"
	docker-compose down -v

clean-all: ## Повне очищення
	@echo "$(RED)Повне очищення...$(NC)"
	docker-compose down -v --rmi all

prune: ## Очистити невикористовувані Docker ресурси
	@echo "$(RED)Очищення Docker...$(NC)"
	docker system prune -f

# ============================================
# ІНШЕ
# ============================================

ps: ## Статус контейнерів
	docker-compose ps

setup: ## Створити .env файл
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(GREEN)✓ .env створено$(NC)"; \
	else \
		echo "$(GREEN)✓ .env вже існує$(NC)"; \
	fi

.DEFAULT_GOAL := help
