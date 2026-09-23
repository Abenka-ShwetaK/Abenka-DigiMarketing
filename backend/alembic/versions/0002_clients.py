"""Create clients table.

Revision ID: 0002_clients
Revises: 0001_foundation
Create Date: 2026-09-23
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0002_clients"
down_revision = "0001_foundation"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "clients",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("company_name", sa.String(length=255), nullable=False),
        sa.Column("contact_person", sa.String(length=255), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("industry", sa.String(length=120), nullable=True),
        sa.Column("website", sa.String(length=500), nullable=True),
        sa.Column("business_description", sa.Text(), nullable=True),
        sa.Column("target_audience", sa.Text(), nullable=True),
        sa.Column("marketing_goals", sa.Text(), nullable=True),
        sa.Column("location", sa.String(length=255), nullable=True),
        sa.Column("status", sa.String(length=32), server_default="prospect", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_clients_company_name", "clients", ["company_name"], unique=False)
    op.create_index("ix_clients_status", "clients", ["status"], unique=False)
    op.create_index("ix_clients_deleted_at", "clients", ["deleted_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_clients_deleted_at", table_name="clients")
    op.drop_index("ix_clients_status", table_name="clients")
    op.drop_index("ix_clients_company_name", table_name="clients")
    op.drop_table("clients")
