"""Alembic placeholder revision.

Revision ID: 0001_foundation
Revises:
Create Date: 2026-09-15
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0001_foundation"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute(sa.text("SELECT 1"))


def downgrade() -> None:
    pass
